const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const LookBookSchema = new Schema({
userId:{
      type:Object,
      required:true
      },
pictureUrl: { type: String },
createdAt: { type: Date, default: Date.now },
updatedAt: { type: Date }
});

module.exports = mongoose.model('LookBook', LookBookSchema);