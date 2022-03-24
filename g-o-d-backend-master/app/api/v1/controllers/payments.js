const paymentModel = require('../models/payments');
const userModel = require('../models/user');
const subscriptionModel = require('../models/subscription');
const jwt = require('jsonwebtoken');	
const stripe = require('stripe')('sk_test_O2qSfByQxkt4HgDL2A0bwO7r00AwdfVrCq');
const striped = require('stripe')('pk_test_sntSe2uSuOohMsBh66biH34d00mLeSb2eh');


module.exports = {

// paymentintent: function(req, res, next) {
// stripe.paymentIntents.create({
// amount:req.body.amount,
// currency:req.body.currency,
// setup_future_usage: 'off_session',
// }).exec()
// },

paymentintent: function(req, res, next) {
subscriptionModel.find({"_id": req.body.subscriptionId}, function(err, subscription){
if (err) {
next(err);
} else {
stripe.paymentIntents.create({
amount:req.body.amount,
currency:req.body.currency,
setup_future_usage: 'off_session',
}).then((result)=>{
console.log(result)
let secret = result.client_secret
let cardElement = {
cardNumber:req.body.cardNumber,
cardExpiry:req.body.cardExpiry,
cardCvc:req.body.cardCvc   
}
striped.handleCardPayment(
secret, 
cardElement).then(function(payment) {
if (payment.error) {
res.status(500).send({error:payment.error});
} else {
let start = new Date();
let numberOfDaysToAdd = subscription.duration;
let end =  start.setDate(start.getDate() + numberOfDaysToAdd); 
userModel.updateOne({"_id": req.body.userId},{ $set:{
subscriptionId: req.body.subscriptionId, subscriptionStart:start,subscriptionEnd:end}}, { new: true },function(err, created){
if(err){
res.json({
err: err,
message: 'could not subscrive'
})
}
else {
res.json({
created: created,
charge: charge,
message: "subscribed successfully!!"
})
}
})
}
});
})
.catch(err => {
console.log("Error:", err);
res.status(500).send({error: "Customer Details Invalid"});
});
}
})
},

addbankintent: function(req, res, next) {
},
createsource:function(req, res, next){
stripe.sources.create({
type: 'ach_credit_transfer',
currency: 'usd',
owner: {
email: 'jenny.rosen@example.com'
}
}, function(err, source) {
        // asynchronously called
});
},

}