const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  payer: String, 
  gameID: 'ObjectId',
  payoutDate: Date,
  amount: Number,
  gameHost: String,
  enteredDate: {type: Date, default: new Date()},
  paid: {type: Boolean, default: false}
});

module.exports = mongoose.model('Payment', PaymentSchema);
