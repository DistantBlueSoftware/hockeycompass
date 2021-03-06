const mongoose = require('mongoose');

const VenueSchema = new mongoose.Schema({
  name: String,
  lastUpdated: Date,
  address: String,
  phone: String,
  city: String,
  state: String,
  zip: String,
  url: String
});

module.exports = mongoose.model('Venue', VenueSchema);
