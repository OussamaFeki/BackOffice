const mongoose = require('mongoose');

const PackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  stades:{type: Number, required: true},
  features: [{ type: String }],
  // You can add more fields based on the specific attributes of your Pack
});

const Pack = mongoose.model('Pack', PackSchema);

module.exports = Pack;
