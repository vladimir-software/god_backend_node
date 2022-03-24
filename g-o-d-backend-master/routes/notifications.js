const express = require('express');
const router = express.Router();
const notificationController = require('../app/api/v1/controllers/notifications');
var jwt = require('jsonwebtoken');
const { secret } = require('../config/secret'); //database configuration


router.post('/', hasToken, notificationController.create);
router.get('/', hasToken, notificationController.getall);
router.get('/:notificationId', notificationController.getById);
router.delete('/:notificationId', notificationController.deleteById);


// function validateUser(req, res, next) {
//   const token = req.body.token || req.headers['x-access-token'];
//   if (token) {
//     jwt.verify(token, process.env.SECRET, (err, decoded) => {
//       if (err) {
//         return res.status(403).send(err);
//       }
//       req.decoded = decoded;
//       return next();
//     });
//   else {
//     res.status(403).send({
//       message: 'You have to be loggedin first'
//     });
//   }
//     },
  

function hasToken(req, res, next) {
  const token = req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(403).send(err);
      }
      req.body.userId = decoded.id;
      return next();
    });
  } else {
    res.status(403).send({
      message: 'You have to be loggedin first'
    });
  }
}

module.exports = router;