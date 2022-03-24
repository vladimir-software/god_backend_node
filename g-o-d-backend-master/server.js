const express = require('express');
const logger = require('morgan');
const users = require('./routes/user');
const services = require('./routes/services')
const image = require('./routes/route')
const notifications = require('./routes/notifications')
const bookings = require('./routes/bookings')
const messages = require('./routes/messages')
const conversations = require('./routes/conversations')
const reviews = require('./routes/reviews')
const categories = require('./routes/categories')
const subscription = require('./routes/subscription')
const bill = require('./routes/bills')
const city = require('./routes/city')
const payment = require('./routes/payments')
const testimonials = require('./routes/testimonial')
const accounts = require('./routes/accounts')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const localmongoDB = 'mongodb://localhost:27017/glamour'; //database configuration
var jwt = require('jsonwebtoken');

//create a new express application
const app = express()

//require the http module
const http = require('http').Server(app)

// require the socket.io module
const io = require('socket.io');


const socket = io(http);
var path = require('path');
// set response headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token');
  next();
});



app.set('secretKey', 'ZDhLq7Ssi7RTiThdu7guy4pDWaJVqdasaAPHKruFKK0fZwAVHNzz70hxCEEdtIgT'); // jwt secret token

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

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.disable('etag');
app.use(express.static(path.join(__dirname, 'public')))
app.use('/uploads', express.static('uploads'))

app.get('/', function (req, res) {
  res.json({ "Online": "API is online" });
});

// public route
app.use('/users', users);
app.use('/uploads', image);


// private route
app.use('/services', services);
app.use('/notifications', notifications);
app.use('/bookings', bookings);
app.use('/messages', messages);

app.use('/conversations', conversations);
app.use('/reviews', reviews);
app.use('/categories', categories);
app.use('/subscription', subscription);
app.use('/testimonials', testimonials);
app.use('/bill', bill);
app.use('/city', city);
app.use('/payments', payment)
app.use('/accounts', accounts)

app.get('/favicon.ico', function (req, res) {
  res.sendStatus(204);
});



function validateAdmin(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function (err, decoded) {
    if (err) {
      res.json({ status: "error", message: err.message });
    } else {
      // add user id to request
      req.body.userId = decoded.id;
      next();
    }
  });

}

////To listen to messages
// socket.on('connection', (socket)=>{
//   console.log('user connected');
//   });

//   //Someone is typing
//   socket.on("typing", data => {
//     socket.broadcast.emit("notifyTyping", {
//       user: data.user,
//       message: data.message
//     });
//   });

//   //when soemone stops typing
//   socket.on("stopTyping", () => {
//     socket.broadcast.emit("notifyStopTyping");
//   });



//wire up the server to listen to our port 500
// http.listen(process.env.PORT, ()=>{
// console.log('connected to port: '+ process.env.PORT)
// });


// express doesn't consider not found 404 as an error so we need to handle 404 it explicitly
// handle 404 error
app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// handle errors
app.use(function (err, req, res, next) {
  console.log(err);

  if (err.status === 404)
    res.status(404).json({ message: "Not found" });
  else if (err.status === 403)
    res.status(403).json({ message: "Unauthorized" })
  else
    res.status(500).json({ message: "Something looks wrong" });

});


let port = process.env.PORT || 3000
app.listen(port, function () {
  console.log('Node server listening on port ' + port)
});