const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
    name: { type: String, required: false },
    firstname:{ type: String, required: false},
    NickName:{type: String, required: false},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone:{type: Number},
    city:{type:String},
    creationDate:{type:Date,default:Date.now}
  // You can add more fields based on the specific attributes of your Pack
});

const Player = mongoose.model('Player', PlayerSchema);

module.exports = Player;
