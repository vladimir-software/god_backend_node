const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const BookingSchema = new Schema({
reference: {
type: String,
trim:true
},
userId:{
type:Object,
required:true
},
providerId:{
type:Object,
required:true
},
addressId:{
    type:Object,
    required:true
    },
services: Array ,
amount: {
type: String,
required: true,
 },
 paymentStatus: {
    type: String,
    default:'pending'
},
status: {
    type: String,
    default:'cancelled'
},
time: {
    type: String,
    required:true,
},
 
createdAt: { type: Date, default: Date.now },
updatedAt: { type: Date }
});

module.exports = mongoose.model('Booking', BookingSchema);