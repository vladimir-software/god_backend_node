const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const TestimonialSchema = new Schema({

fullname: { type: String },
pictureUrl:{type:String, 
    required: true},
body:{type:String, 
required: true},
userLocation:{type:String, 
    required: true},
createdAt: { type: Date, default: Date.now },
updatedAt: { type: Date }
});

module.exports = mongoose.model('Testimonial', TestimonialSchema);