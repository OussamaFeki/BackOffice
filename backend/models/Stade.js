const mongoose = require('mongoose');
const StadeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    capacity: { type: Number, required: true },
    stadeOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'Stade_Owner' },
    isVIP:{ type: Boolean, default: false },
    createdAt:{ type: Date, default: Date.now },
});

const Stade = mongoose.model('Stade', StadeSchema);

module.exports = Stade;