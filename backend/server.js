require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const Hospital = require('./models/Hospital');
const Patient = require('./models/Patient');
const Bed = require('./models/Bed');
const MaxHeap = require('./utils/MaxHeap');
const { calculateTriageScore } = require('./utils/triage');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Map of hospitalId (string) -> MaxHeap instance
const hospitalQueues = new Map();

// Database Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/acuityflow';
mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    await initializeSystem();
  })
  .catch(err => console.error('MongoDB connection error:', err));

// System Initialization (Cold Start Recovery for all hospitals)
async function initializeSystem() {
  try {
    const hospitals = await Hospital.find();
    for (const hospital of hospitals) {
      const hid = hospital._id.toString();
      hospitalQueues.set(hid, new MaxHeap());
      
      const waitingPatients = await Patient.find({ hospitalId: hid, status: 'Waiting' });
      hospitalQueues.get(hid).buildHeap(waitingPatients);
      console.log(`Reconstructed Max-Heap for hospital ${hospital.name} with ${waitingPatients.length} waiting patients.`);
    }
  } catch (error) {
    console.error('Initialization error:', error);
  }
}

// Socket.io Connection
io.on('connection', (socket) => {
  console.log('A client connected:', socket.id);
  
  // Clients must join a hospital room to get updates
  socket.on('join_hospital', async (hospitalId) => {
    socket.join(hospitalId);
    console.log(`Socket ${socket.id} joined hospital room: ${hospitalId}`);
    // Emit current state for this specific hospital to this specific socket
    const beds = await Bed.find({ hospitalId }).populate('patientId');
    const q = hospitalQueues.get(hospitalId);
    const queue = q ? q.toArray() : [];
    socket.emit('state_update', { queue, beds });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Helper to emit full state to a specific hospital room
async function emitState(hospitalId) {
  try {
    const beds = await Bed.find({ hospitalId }).populate('patientId');
    const q = hospitalQueues.get(hospitalId);
    const queue = q ? q.toArray() : [];
    io.to(hospitalId).emit('state_update', { queue, beds });
  } catch (error) {
    console.error(`Error emitting state for ${hospitalId}:`, error);
  }
}

// --- REST API ENDPOINTS ---

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'PulseNode Secure Server Running' });
});

// 1. Register Hospital
app.post('/api/hospitals', async (req, res) => {
  try {
    const { name, location, employeeCount, privateBedsCount, generalBedsCount, adminEmail, password } = req.body;
    
    // Check if hospital already exists with this email
    const existingHospital = await Hospital.findOne({ adminEmail });
    if (existingHospital) {
      return res.status(400).json({ error: 'A hospital with this admin email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newHospital = new Hospital({
      name, location, adminEmail, password: hashedPassword, employeeCount, privateBedsCount, generalBedsCount
    });
    await newHospital.save();
    
    // Seed the beds
    const bedsToCreate = [];
    let bedIndex = 1;
    for (let i = 0; i < privateBedsCount; i++) {
      bedsToCreate.push({ bedNumber: `P-${bedIndex++}`, bedType: 'Private', hospitalId: newHospital._id });
    }
    for (let i = 0; i < generalBedsCount; i++) {
      bedsToCreate.push({ bedNumber: `G-${bedIndex++}`, bedType: 'General', hospitalId: newHospital._id });
    }
    
    await Bed.insertMany(bedsToCreate);
    
    // Initialize their empty queue
    hospitalQueues.set(newHospital._id.toString(), new MaxHeap());
    
    res.status(201).json({ message: 'Hospital registered', hospital: newHospital });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 1.5. Login Hospital
app.post('/api/auth/login', async (req, res) => {
  try {
    const { adminEmail, password } = req.body;
    
    const hospital = await Hospital.findOne({ adminEmail });
    if (!hospital) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, hospital.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    res.json({ message: 'Login successful', hospitalId: hospital._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 1.6. Live Demo Login
app.post('/api/auth/demo', async (req, res) => {
  try {
    let demoHospital = await Hospital.findOne({ name: "Demo Hospital" });
    
    if (!demoHospital) {
      const hashedPassword = await bcrypt.hash("demo123", 10);
      demoHospital = new Hospital({
        name: "Demo Hospital",
        location: "Virtual Cloud",
        capacity: 10,
        adminEmail: "demo@demo.com",
        password: hashedPassword,
        generalBedsCount: 10,
        privateBedsCount: 0,
        employeeCount: 50
      });
      await demoHospital.save();

      const bedsToCreate = [];
      for (let i = 1; i <= 10; i++) {
        bedsToCreate.push({ bedNumber: `D-${i}`, bedType: 'General', hospitalId: demoHospital._id });
      }
      await Bed.insertMany(bedsToCreate);

      hospitalQueues.set(demoHospital._id.toString(), new MaxHeap());
    }

    res.json({ message: 'Demo ready', hospitalId: demoHospital._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Get Hospital Stats (for Admin Dashboard)
app.get('/api/hospitals/:id', async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) return res.status(404).json({ error: 'Hospital not found' });
    
    const beds = await Bed.find({ hospitalId: req.params.id });
    const availableBeds = beds.filter(b => !b.isOccupied).length;
    
    res.json({ hospital, totalBeds: beds.length, availableBeds });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Get Current Triage State (Queue & Beds)
app.get('/api/state/:hospitalId', async (req, res) => {
  try {
    const { hospitalId } = req.params;
    const beds = await Bed.find({ hospitalId }).populate('patientId');
    const q = hospitalQueues.get(hospitalId);
    const queue = q ? q.toArray() : [];
    res.json({ queue, beds });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. Patient Intake API (Requires hospitalId)
app.post('/api/patients', async (req, res) => {
  try {
    const { hospitalId, name, age, heartRate, bloodPressureSys, bloodPressureDia, symptomSeverity, bloodGroup, activeBloodLoss, medicalNotes } = req.body;
    if (!hospitalId) return res.status(400).json({ error: 'hospitalId required' });

    const triageScore = calculateTriageScore({
      age, heartRate, bloodPressureSys, bloodPressureDia, symptomSeverity, activeBloodLoss
    });

    const newPatient = new Patient({
      hospitalId, name, age, heartRate, bloodPressureSys, bloodPressureDia, symptomSeverity, triageScore, bloodGroup, activeBloodLoss, medicalNotes
    });

    await newPatient.save();
    
    const q = hospitalQueues.get(hospitalId);
    if (q) q.insert(newPatient.toObject());
    
    emitState(hospitalId);
    res.status(201).json({ message: 'Patient admitted successfully', patient: newPatient });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 5. Resource Matcher API
app.post('/api/beds/discharge', async (req, res) => {
  try {
    const { bedId, hospitalId } = req.body;
    if (!hospitalId) return res.status(400).json({ error: 'hospitalId required' });
    
    const bed = await Bed.findById(bedId);
    if (!bed || bed.hospitalId.toString() !== hospitalId) {
      return res.status(404).json({ error: 'Bed not found in this hospital' });
    }

    if (bed.isOccupied && bed.patientId) {
      await Patient.findByIdAndDelete(bed.patientId);
    }

    const q = hospitalQueues.get(hospitalId);
    const highestPriorityPatient = q ? q.extractMax() : null;

    if (highestPriorityPatient) {
      bed.isOccupied = true;
      bed.patientId = highestPriorityPatient._id;
      bed.lastUpdated = Date.now();
      await bed.save();
    } else {
      bed.isOccupied = false;
      bed.patientId = null;
      bed.lastUpdated = Date.now();
      await bed.save();
    }

    emitState(hospitalId);
    res.status(200).json({ message: 'Bed updated successfully', bed });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5.5 Auto-Allocate Empty Beds
app.post('/api/beds/auto-allocate', async (req, res) => {
  try {
    const { hospitalId } = req.body;
    if (!hospitalId) return res.status(400).json({ error: 'hospitalId required' });

    const q = hospitalQueues.get(hospitalId);
    if (!q || q.toArray().length === 0) {
      return res.status(400).json({ error: 'No patients in queue' });
    }

    const emptyBeds = await Bed.find({ hospitalId, isOccupied: false });
    if (emptyBeds.length === 0) {
      return res.status(400).json({ error: 'No empty beds available' });
    }

    let allocatedCount = 0;
    for (const bed of emptyBeds) {
      const highestPriorityPatient = q.extractMax();
      if (!highestPriorityPatient) break; // Queue is empty

      bed.isOccupied = true;
      bed.patientId = highestPriorityPatient._id;
      bed.lastUpdated = Date.now();
      await bed.save();
      allocatedCount++;
    }

    emitState(hospitalId);
    res.status(200).json({ message: `Successfully allocated ${allocatedCount} beds` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 6. Delete Hospital Profile
app.delete('/api/hospitals/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Delete the hospital
    const deletedHospital = await Hospital.findByIdAndDelete(id);
    if (!deletedHospital) return res.status(404).json({ error: 'Hospital not found' });
    
    // Delete associated Beds and Patients
    await Bed.deleteMany({ hospitalId: id });
    await Patient.deleteMany({ hospitalId: id });
    
    // Remove from in-memory queue map
    hospitalQueues.delete(id);
    
    res.json({ message: 'Hospital profile and all associated data deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
