const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const ServiceSchema = new Schema({
  userId: {
    type: Object,
    required: true
  },
  serviceName: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    required: true,

  },
  status: {
    type: String,
    required: true,
    default: 'inactive'

  },
  amount: {
    type: String,
    required: true,

  },
  duration: {
    type: String,
    required: true,

  },
  serviceCategoryId: {
    type: Object,
    required: true
  },
  pictureUrl: {
    type: String,
    trim: true,
    required: true,

  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
});

module.exports = mongoose.model('Service', ServiceSchema);