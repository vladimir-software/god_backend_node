//Set up mongoose connection
const mongoose = require('mongoose');
const localmongoDB = 'mongodb://localhost:27017/glamour';
// const mongoDB = 'mongodb://heroku_nmwv7j08:m156otd29o5dlmm7k2i28m5jct@ds121026.mlab.com:21026/heroku_nmwv7j08';
// mongoose.connect(localmongoDB);
//mongoose.connect(mongoDB);

try{
    // Database configuration
mongoose.Promise = global.Promise;
mongoose.connect(localmongoDB, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
});
}catch(err){
        console.log("Error connecting Mongodb");
        console.log(err.message)
}
    
// mongoose.Promise = global.Promise;
// mongoose.set('useFindAndModify', false);
// mongoose.set('useNewUrlParser', true);
// mongoose.set('useCreateIndex', true);

// module.exports = mongoose;
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));