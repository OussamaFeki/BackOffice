const mongoose = require('mongoose');
const Stade_OwnerSchema = new mongoose.Schema({
    name: { type: String, required: false },
    firstname:{ type: String, required: false},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone:{type: Number},
    city:{type:String},
    stades: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Stade' }], // Assuming Stade is another model/schema
    isApproved: { type: Boolean, default: false },
    Wantupdate: { type: Boolean, default: false }, // New field to track approval status
    LastPackDate: { type: Date, default: Date.now },
    pack:{ type: mongoose.Schema.Types.ObjectId, ref: 'Pack' }
  });
  const Stade_Owner= mongoose.model('Stade_Owner', Stade_OwnerSchema );
module.exports = Stade_Owner;