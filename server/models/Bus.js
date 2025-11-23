const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  route: {
    type: String,
    required: true,
    trim: true
  },
  fee: {
    type: Number,
    required: true,
    min: 0
  },
  timing: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: false,
  _id: true
});

const busSchema = new mongoose.Schema({
  busNo: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  routes: [routeSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Bus', busSchema);


