const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const SaveProvidersSchema = new Schema({

userId:{
type:Object,
required:true
},
providerId:{
type:Object,
required:true
},
createdAt: { type: Date, default: Date.now },
updatedAt: { type: Date }
});

module.exports = mongoose.model('SaveProviders', SaveProvidersSchema);