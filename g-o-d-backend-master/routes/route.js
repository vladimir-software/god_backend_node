const express = require('express');
const router = express.Router();
const userController = require('../app/api/v1/controllers/user');
const categoryController = require('../app/api/v1/controllers/servicecategories');
const serviceController = require('../app/api/v1/controllers/services')
const testimonialController = require('../app/api/v1/controllers/testimonial')
var jwt = require('jsonwebtoken');
const { secret } = require('../config/secret'); //database configuration
var upload = require('../config/multer');

router.post('/addImage/:userId', hasToken, upload.any(), userController.updatepicture);
router.post('/addBanner/:userId', hasToken, upload.any(), userController.updatebannerpicture);
router.post('/addlook/:userId', hasToken, upload.any(), userController.lookbook);
router.post('/categories', upload.any(), categoryController.create);
router.post('/services', upload.any(), hasToken,  serviceController.create);
router.post('/testimonial', upload.any(),  testimonialController.create);
router.post('/', upload.any(), hasToken,  serviceController.uploadImage);

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