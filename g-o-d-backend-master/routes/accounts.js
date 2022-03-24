const express = require('express');
const router = express.Router();
const accountController = require('../app/api/v1/controllers/accounts');
var jwt = require('jsonwebtoken');
const { secret } = require('../config/secret'); //database configuration


router.post('/', hasToken, accountController.create);
router.get('/', hasToken, accountController.getall);
router.delete('/:accountId', accountController.deleteById);
router.get('/:accountId', accountController.getById);
router.put('/:accountId', hasToken, accountController.updateById);



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