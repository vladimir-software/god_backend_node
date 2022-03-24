const express = require('express');
const router = express.Router();
const categoryController = require('../app/api/v1/controllers/servicecategories');
var jwt = require('jsonwebtoken');
const { secret } = require('../config/secret'); //database configuration


router.get('/', categoryController.getall);
router.put('/:serviceId', hasToken, categoryController.updateById);
router.delete('/:serviceId', hasToken, categoryController.deleteById);


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