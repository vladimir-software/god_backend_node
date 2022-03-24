const express = require('express');
const router = express.Router();
const bookingController = require('../app/api/v1/controllers/bookings');
var jwt = require('jsonwebtoken');
const { secret } = require('../config/secret'); //database configuration


router.post('/', hasToken, bookingController.create);
router.post('/pay/:bookingId', hasToken, bookingController.payment);
router.put('/confirm-pay/:bookingId', hasToken, bookingController.updatePaymentStatus);
router.put('/status/:bookingId', hasToken, bookingController.updateStatus);
router.get('/', hasToken, bookingController.getallclient);
router.get('/admin', hasToken, bookingController.getall);
router.get('/provider', hasToken, bookingController.getallprovider);
router.get('/schedule/:providerId', bookingController.getschedule);
router.get('/:bookingId', hasToken, bookingController.getById);
router.delete('/:bookingId', hasToken, bookingController.deleteById);
router.get('/payouts', hasToken, bookingController.getuserpayout);



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