const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const ServiceReviewsSchema = new Schema({

userId:{
type:Object,
required:true
},
providerId:{
type:Object,
required:true
},
 rating: {
type: Number,
required:true
 },
description: {
  type: String,
  required: true,

 },
createdAt: { type: Date, default: Date.now },
updatedAt: { type: Date }
});

module.exports = mongoose.model('ServiceReviews', ServiceReviewsSchema);