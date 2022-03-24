const express = require('express');
const router = express.Router();
const messageController = require('../app/api/v1/controllers/messages');
var jwt = require('jsonwebtoken');
const { secret } = require('../config/secret'); //database configuration


router.post('/conversation', hasToken, messageController.create);
router.post('/', hasToken, messageController.createmessage);
router.get('/:conversationId', hasToken, messageController.getMessages);
router.get('/provider', hasToken, messageController.getProviderMessages);
router.get('/client', hasToken, messageController.getClientMessages);




function hasToken(req, res, next) {
  const token = req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(403).send(err);
      }
      req.body.userId = decoded.id;
      req.body.role = decoded.role;
      return next();
    });
  } else {
    res.status(403).send({
      message: 'You have to be loggedin first'
    });
  }
}

module.exports = router;