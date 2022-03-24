const subscriptionModel = require('../models/subscription');
const jwt = require('jsonwebtoken');				

module.exports = {
	create: function(req, res, next) {
		subscriptionModel.create(
			{ name: req.body.name, 
        duration: req.body.duration,
        amount: req.body.amount,
        currency:req.body.currency
			}, function (err, result) {
				  if (err) 
				  	next(err);
				  else
				  	res.json({status: "ok", message: "Subscription created successfully", data:result});
				  
				});
    },
    getall:function(req,res,next){
        const promise = subscriptionModel.find().exec();
        promise.then(subscriptions => res.status(200).send({
              success: true,
              subscriptions
            }))
              .catch(err => res.status(500).send({
                success: false,
                error: err
              }));
        },

     
        deleteById: function(req, res, next) {
          subscriptionModel.deleteOne({"_id":req.params.subscriptionId}, function(err){
           if(err)
            next(err);
           else {
            res.json({status:"success", message: "Deleted successfully!!!"});
           }
          });
         },
      

         getById: function(req, res, next) {
            subscriptionModel.findById(req.params.subscriptionId, function(err, subscriptionInfo){
             if (err) {
              next(err);
             } else {
              res.json({status:"success", message: "ok", data:{subscriptionInfo}});
             }
            });
           },


}				