const mongoose = require('mongoose');

const bedSchema = new mongoose.Schema({
  bedNumber: { type: String, required: true },
  bedType: { type: String, enum: ['Private', 'General'], required: true },
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
  isOccupied: { type: Boolean, default: false },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', default: null },
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Bed', bedSchema);
