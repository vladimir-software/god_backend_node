const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const CitySchema = new Schema({
postCode:{type:String, required: true},
city:{type:String, required: true},
country:{type:String, required: true},
status: {type: String, default:'Active'
},
createdAt: { type: Date, default: Date.now },
updatedAt: { type: Date }
});

module.exports = mongoose.model('City', CitySchema);