const express = require('express');
const router = express.Router();
const serviceController = require('../app/api/v1/controllers/services');
const categoryController = require('../app/api/v1/controllers/servicecategories');
const reviewController = require('../app/api/v1/controllers/servicereviews');
var upload = require('../config/multer');
var jwt = require('jsonwebtoken');
const { secret } = require('../config/secret'); //database configuration

//router.post('/', hasToken, serviceController.create);
router.get('/:userId', hasToken, serviceController.getall);
router.get('/provider/:providerId', serviceController.getproviderservices);
router.delete('/:serviceId', serviceController.deleteById);
router.post('/:serviceId', serviceController.updateById);
router.get('/categories', categoryController.getall);
router.get('/trends', serviceController.gettrends);
router.post('/review', hasToken, reviewController.create);
router.delete('/:servicereviewId', hasToken, reviewController.deleteById);
router.get('/review/:providerId', reviewController.getproviderreviews);


function hasToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          return res.status(403).send(err);
        }
        req.body.user = decoded.user;
        return next();
      });
    } else {
      res.status(403).send({
        message: 'You have to be loggedin '
      });
    }
  }


module.exports = router;