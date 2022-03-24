const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const NotificationSchema = new Schema({
userId:{
type:Object,
required:true
},
providerId:{
type:Object,
required:true
},
bookingId:{
type:Object
},
title: {
type: String,
trim: true,  
},
body: {
type: String,
required: true,
},
status: {
type: Number,
default: 0,
},
 
createdAt: { type: Date, default: Date.now },
updatedAt: { type: Date }
});

module.exports = mongoose.model('Notification', NotificationSchema);