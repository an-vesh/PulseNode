const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  adminEmail: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  employeeCount: { type: Number, required: true },
  privateBedsCount: { type: Number, required: true },
  generalBedsCount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Hospital', hospitalSchema);
