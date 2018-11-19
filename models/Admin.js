const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  userID: String,
  active: Boolean,
});

module.exports = mongoose.model('Admin', AdminSchema);
