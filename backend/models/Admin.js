const mongoose = require('mongoose');
const AdminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // Add other properties specific to your Admin model if needed
});

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;