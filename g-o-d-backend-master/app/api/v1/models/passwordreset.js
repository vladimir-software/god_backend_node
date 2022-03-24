const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;
const PasswordResetSchema = new Schema({

email: {type: String},
token: {type: String}
});

module.exports = mongoose.model('Reset', PasswordResetSchema);