const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const AccountSchema = new Schema({
userId:{
type:Object,
required:true
},
accountNumber: { type: String },
accountName: { type: String },
sortCode: { type: String },
createdAt: { type: Date, default: Date.now },
updatedAt: { type: Date }
});

module.exports = mongoose.model('Account', AccountSchema);