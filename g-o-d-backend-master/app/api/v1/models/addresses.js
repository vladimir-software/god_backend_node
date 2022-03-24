const mongoose = require("mongoose");
//Define a schema
const Schema = mongoose.Schema;
const AddressSchema = new Schema({
  userId: {
    type: Object,
    required: true,
  },
  aptNumber: {
    type: String,
    required: true,
  },
  streetNumber: {
    type: String,
    required: true,
  },
  postCode: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

module.exports = mongoose.model("Address", AddressSchema);
