const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
const RoleSchema = new Schema({
 name: {
  type: String,
  trim: true,  
  required: true,
 }
 });
// hash user password before saving into database
module.exports = mongoose.model('Role', UserSchema);