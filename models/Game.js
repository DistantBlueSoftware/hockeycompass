const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
  name: { type: String },
  date: { type: Date },
  startDate: { type: Date },
  endDate: { type: Date },
  duration: { type: Number },
  dateCreated: { type: Date, default: new Date() },
  type: { type: String },
  invited: [String],
  location: { type: String },
  host: { type: String },
  hostID: { type: String },
  maxPlayers: { type: Number },
  goalieCount: { type: Number },
  skillLevel: { type: Number },
  players: [
    {
      username: { type: String },
      name: { type: String },
      type: { type: String },
      paid: { type: Boolean, default: false },
      joinDate: { type: date, default: new Date() }
    }
  ],
  costPerPlayer: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
  payoutDistributed: { type: Boolean, default: false },
  privateNotifyAll: { type: Boolean, default: false },
  payAtDoor: { type: Boolean, default: false },
  comment: { type: String },
  waitlist: [
    {
      username: { type: String },
      name: { type: String },
      type: { type: String }
    }
  ]
});

module.exports = mongoose.model("Game", GameSchema);
