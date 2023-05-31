const mongoose = require('mongoose');

const virtualizationEnvSchema = new mongoose.Schema({
  type: String,
  processur: String,
  ram: String,
  stockage: String,
  bande_passante: String,
  systeme_exploitation: String,
  start: Date,
  end: Date,
  applicant: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  isAccepted: Boolean,
  description: { type: String, required: false, default: "" },
});

const VirtualizationEnv = mongoose.model('VirtualizationEnv', virtualizationEnvSchema);

module.exports = VirtualizationEnv;

