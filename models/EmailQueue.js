const mongoose = require('mongoose');

const EmailQueueSchema = new mongoose.Schema({
  gameID: {type: String, required: true},
  sendDate: {type: Date, required: true}
});

module.exports = mongoose.model('EmailQueue', EmailQueueSchema);
