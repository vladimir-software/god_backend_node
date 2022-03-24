const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const MessageSchema = new Schema({
body:{type:String, 
    required: true},
conversationId:{
type: Object,
required: true
},
userId:{
type: Object,
required:true
},
createdAt: { type: Date, default: Date.now },
updatedAt: { type: Date }
});

module.exports = mongoose.model('Messages', MessageSchema);