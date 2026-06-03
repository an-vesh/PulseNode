const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  heartRate: { type: Number, required: true },
  bloodPressureSys: { type: Number, required: true },
  bloodPressureDia: { type: Number, required: true },
  symptomSeverity: { type: Number, required: true, min: 1, max: 10 },
  bloodGroup: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown'], default: 'Unknown' },
  activeBloodLoss: { type: Boolean, default: false },
  medicalNotes: { type: String, default: '' },
  triageScore: { type: Number, required: true },
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
  status: { 
    type: String, 
    enum: ['Waiting', 'Treated'], 
    default: 'Waiting' 
  },
  admittedAt: { type: Date, default: Date.now },
  treatedAt: { type: Date }
});

module.exports = mongoose.model('Patient', patientSchema);
