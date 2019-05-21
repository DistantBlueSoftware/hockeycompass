const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  name: {type: String},
  date: {type: Date},
  startTime: {type: String},
  endTime: {type: String},
  dateCreated: {type: Date, default: new Date()},
  type: {type: String},
  invited: [String],
  location: {type: String},
  host: {type: String},
  hostID: {type: String},
  maxPlayers: {type: Number},
  goalieCount: {type: Number},
  skillLevel: {type: Number},
  players: [{username: {type: String}, name: {type: String}, type: {type: String}}],
  costPerPlayer: {type: Number, default: 0},
  active: {type: Boolean, default: true},
  payoutDistributed: {type: Boolean, default: false},
  privateNotifyAll: {type: Boolean, default: false},
  comment: {type: String}
});

module.exports = mongoose.model('Game', GameSchema);
