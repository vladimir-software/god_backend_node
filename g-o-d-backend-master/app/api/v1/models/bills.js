const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const BillSchema = new Schema({
userId:{type:Object,required:true},
description:{type:String, required: true},
amount:{type:String, required: true},
createdAt: { type: Date, default: Date.now },
updatedAt: { type: Date }
});

module.exports = mongoose.model('Bill', BillSchema);