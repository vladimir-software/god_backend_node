const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const ServiceCategoriesSchema = new Schema({
 serviceName: {
  type: String,
  trim: true,  
  required: true,
 },
 metaDescription: {
  type: String,
  required: true,

 },
 pictureUrl: {
    type: String,
    trim: true,
    required: true,
  
   },
 
createdAt: { type: Date, default: Date.now },
updatedAt: { type: Date }
});

module.exports = mongoose.model('ServiceCategories', ServiceCategoriesSchema);