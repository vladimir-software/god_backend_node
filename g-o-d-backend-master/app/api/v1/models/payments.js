const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const PaymentsSchema = new Schema({
userId:{
type:Object,
required:true
},
clientSecret:{
type:String
},
createdAt: { type: Date, default: Date.now },
updatedAt: { type: Date }
});

module.exports = mongoose.model('Payments', PaymentsSchema);