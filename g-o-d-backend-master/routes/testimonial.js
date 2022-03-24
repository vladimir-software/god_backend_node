const express = require('express');
const router = express.Router();
const testimonialController = require('../app/api/v1/controllers/testimonial');
var jwt = require('jsonwebtoken');
const { secret } = require('../config/secret'); //database configuration


router.get('/', testimonialController.getall);
router.delete('/:testimonialId', testimonialController.deleteById);
router.get('/:testimonialId', testimonialController.getById);



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