const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const PayoutSchema = new Schema({
userId:{
type:Object,
required:true
},
description: { type: String },
amount: { type: String },
createdAt: { type: Date, default: Date.now },
updatedAt: { type: Date }
});

module.exports = mongoose.model('Payout', PayoutSchema);