const express = require('express');
const router = express.Router();
const cityController = require('../app/api/v1/controllers/city');
var jwt = require('jsonwebtoken');
const { secret } = require('../config/secret'); //database configuration


router.post('/', hasToken, cityController.create);
router.get('/', cityController.getall);
router.post('/postcode', cityController.getpostcode);
router.delete('/:cityId', cityController.deleteById);
router.get('/:cityId', cityController.getById);
router.post('/:cityId', cityController.updateById);




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