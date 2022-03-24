const serviceModel = require('../models/servicereviews');
const userModel = require('../models/user');
const jwt = require('jsonwebtoken');				

module.exports = {
create: function(req, res, next) {
serviceModel.create(
	{ userId:req.body.userId,
        description: req.body.description,
       providerId: req.body.providerId,
       rating:req.body.rating
			}, function (err, result) {
				  if (err) 
				  	next(err);
				  else
				  	res.json({status: "ok", message: "service review added", data:result});
				  
				});
    },
   
     
deleteById: function(req, res, next) {
serviceModel.deleteOne({"_id":req.params.servicereviewId}, function(err, serviceInfo){
if(err)
next(err);
else {
res.json({status:"success", message: "Service review deleted successfully!!!"});
}
});
},


getAllReviews (req, res, next) {
    res.json({reviews: ''})

 
},
      
getproviderreviews:function(req, res, next){
serviceModel.find({providerId:req.params.providerId}, function(err, me){
if (err) 
{next(err);
} 
else 
{
  userModel.find({}).exec()
  .then(users => {
    usersDictionary = users.reduce((payload, user) => {
      payload[user.id] = user
      return payload
    }, {})

    res.json({
      status:"success",
      message: "ok", 
      data: me.map(singleReview => {
        return { 
          review: singleReview, 
          from: { 
            name: usersDictionary[singleReview.userId].fullname, 
            userPhoto: usersDictionary[singleReview.userId].pictureUrl
          }
        }
      })
    });
  })

}
})
},
        
        // getproviderreviews:function(req, res, next){
        //   //if(me.role == 'client'){
        //   serviceModel.find({providerId:req.params.providerId}, function(err, me){
        //       if (err) {
        //        next(err);
        //       } else {
        //   res.json({me: {rating:me.rating, description:me.description, createdAt: me.createdAt, userId:me.userId}});
        //   userModel.find({userId:me.userId}, function(err, user){
        //     if (err) {
        //      next(err);
        //     } else {
        // res.json({user: {fullname:user.fullname, email:user.email, phone:user.phone, createdAt: user.createdAt, role:user.role, pictureUrl:user.pictureUrl}});
              
        //      }
        //    });	 
        //        }
        //      });	
           
        //   //}
        //   },

      //     getproviderreviews:function(req, res, next){
      //       serviceModel.find({providerId: req.params.providerId})
      //       .sort({"createdAt" : 1})
      //       .toArray()
      //       .then(function(reviews){
      //           let promises = [];
      //      reviews.forEach(review => {
      //               promises.push(new Promise(resolve => {
      //                   userModel.findById(review.userId)
      //                       .limit(1)
      //                       .toArray()
      //                       .then(function(user){
      //                           user
      //                           resolve(review);
      //                       });
      //               }));
      //           });
      //           return Promise.all(promises);
      //       })
      //       .then(function(reviews){
      //         reviews
      //           console.log(reviews);
      //       })
      //       .catch(function(error){
      //           // ...
      //   });

      //       // const promise = serviceModel.find({providerId: req.params.providerId}).exec();
      //       // promise.then(reviews => res.status(200).send({
              
      //       //   success: true,
      //       //   reviews
      //       //   }))
      //       //   .catch(err => res.status(500).send({
      //       //     success: false,
      //       //     error: err
      //       //   }));
      //       // const promise = userModel.find({userId: reviews.}).exec();
      //       // promise.then(reviews => res.status(200).send({
      //       //   success: true,
      //       //   reviews
      //       //   }))
      //       //   .catch(err => res.status(500).send({
      //       //     success: false,f
      //       //     error: err
      //       //   }));
      //  },
    

}				