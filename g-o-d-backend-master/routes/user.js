const express = require('express');
const router = express.Router();
const userController = require('../app/api/v1/controllers/user');
var jwt = require('jsonwebtoken');
const { secret } = require('../config/secret'); //database configuration
var upload = require('../config/multer');
const serviceController = require('../app/api/v1/controllers/services');


// user management
router.post('/client/register', userController.clientcreate);
router.post('/provider/register', userController.providercreate);
router.post('/login', userController.authenticate);
router.post('/reset', userController.reset);
router.post('/reset-password', userController.resetpassword);
router.post('/resend-activation', userController.resendactivation);
//router.post('/subscribe', hasToken, userController.updatesub)

router.get('/trends', serviceController.gettrends);
//
router.put('/activate/:token', userController.activateaccount);
router.put('/status/update/:userId', hasToken, userController.updateuserstatus);
router.put('/client/update', hasToken, userController.updateclient);
router.put('/provider/update', hasToken, userController.updateprovider);
router.put('/change-password', hasToken, userController.changepassword);
router.get('/all', userController.getall);
router.get('/clients', userController.getallclients);
router.get('/provider', userController.getallproviders);
router.get('/provider/detail/:userId', userController.getproviderdetails);
router.get('/me', hasToken, userController.getcurrentlyloggedin);
router.post('/address', hasToken, userController.addaddress);
router.get('/address', hasToken, userController.getaddress);
router.put('/address/:addressId', hasToken, userController.updateAddress);
router.delete('/address/:addressId', hasToken, userController.deleteAddress);
router.get('/lookbook/:userId', userController.getlook);
router.delete('/lookbook/:lookbookId', userController.deleteLook)
router.post('/save/provider', hasToken, userController.save);
router.delete('/save/provider/:saveproviderId', hasToken, userController.deleteSave);
router.get('/save/provider', hasToken, userController.getsave);
router.post('/pay/:subscriptionId', hasToken, userController.payment);
router.put('/confirm-pay/:userId', hasToken, userController.updatePaymentStatus);
router.get('/client-status', hasToken, userController.clientstatus);
router.get('/provider-status', hasToken, userController.providerstatus);

function hasToken(req, res, next) {
  const token = req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(403).send(err);
      }
      req.body.userId = decoded.id;
      req.body.email = decoded.email;
      return next();
    });
  } else {
    res.status(403).send({
      message: 'You have to be loggedin first'
    });
  }
}




module.exports = router;