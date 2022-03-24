const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const saltRounds = bcrypt.genSaltSync(10);
//Define a schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
 fullname: {
  type: String,
  trim: true,  
  required: true,
 },
 email: {
  type: String,
  trim: true,
  required: true,
  unique:true
 },
 password: {
  type: String,
  trim: true,
  required: true
 },
 instant: {
    type: Boolean,
    default: false
 },
 phone: {
    type: String,
    trim: true,  
    required: true,
   },
isActive: {
    type: Number,
    default: 0,
},
isOnline: {
    type: Number,
    default: 0,
},
token: { type: String},
role: { type: String},
postcode: { type: String},
mileRadius: { type: String},
meta: { type: String},
description: { type: String},
schedules: Array ,
subscriptionId:{
type: String,
default:'0'
},
subscriptionStart: { type: String,default:null },
subscriptionEnd: { type: String, default:null },
paymentSecret:{
    type: String, 
    default:null 
    },
service: {
    type: String,
    trim: true,  
   },
pictureUrl: { type: String },
bannerUrl: { type: String },
createdAt: { type: Date, default: Date.now },
updatedAt: { type: Date }
});
// hash user password before saving into database
UserSchema.pre('save', function(next){
this.password = bcrypt.hashSync(this.password, saltRounds);
next();
});
module.exports = mongoose.model('User', UserSchema);