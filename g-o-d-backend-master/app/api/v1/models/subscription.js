const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const SubscriptionSchema = new Schema({
name: { type: String },
duration:{type:String, 
    required: true},
currency:{type:String, 
required: true},
amount:{type:String, 
    required: true},
createdAt: { type: Date, default: Date.now },
updatedAt: { type: Date }
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);