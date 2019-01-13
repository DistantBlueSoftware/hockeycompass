const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  name: {type: String},
  date: {type: Date},
  dateCreated: {type: Date, default: new Date()},
  type: {type: String},
  invited: [String],
  location: {type: String},
  host: {type: String},
  hostID: {type: String},
  maxPlayers: {type: Number},
  goalieCount: {type: Number},
  players: {type: [{name: String, type: String}], optional: true},
  costPerPlayer: {type: Number, default: 0},
  active: {type: Boolean, default: true},
  payoutDistributed: {type: Boolean, default: false}
});

module.exports = mongoose.model('Game', GameSchema);
