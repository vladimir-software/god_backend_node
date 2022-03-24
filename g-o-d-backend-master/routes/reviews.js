const express = require('express');
const router = express.Router();

const reviewController = require('../app/api/v1/controllers/servicereviews');
var jwt = require('jsonwebtoken');
const { secret } = require('../config/secret'); //database configuration

//router.post('/', hasToken, serviceController.create);

router.post('/', hasToken, reviewController.create);
router.delete('/:servicereviewId', hasToken, reviewController.deleteById);
router.get('/:providerId', reviewController.getproviderreviews)
// router.delete('/delete', serviceController.delete);
// router.put('/edit', serviceController.put);


function hasToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          return res.status(403).send(err);
        }
        req.body.userId= decoded.id;
        return next();
      });
    } else {
      res.status(403).send({
        message: 'You have to be loggedin first'
      });
    }
  }


module.exports = router;