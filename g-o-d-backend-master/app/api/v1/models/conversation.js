const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const ConversationSchema = new Schema({

clientId:{
type: Object,
required:true
},
providerId:{
type: Object,
required:true
},
providerstatus: {type: Number, default:0
},
clientstatus: {type: Number, default:0
},
});

module.exports = mongoose.model('Conversations', ConversationSchema);