const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  name: {type: String},
  date: {type: Date},
  type: {type: String},
  location: {type: String},
  host: {type: String},
  maxPlayers: {type: Number},
  players: {type: [String], optional: true}
});

module.exports = mongoose.model('Game', GameSchema);
