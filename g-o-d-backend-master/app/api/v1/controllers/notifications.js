const notificationModel = require('../models/notifications');
const userModel = require('../models/user');
const jwt = require('jsonwebtoken');				

module.exports = {
	create: function(req, res, next) {
		notificationModel.create(
			{ title: req.body.title, 
        body: req.body.body,
        userId: req.body.userId,
        providerId: req.body.providerId,
        bookingId:req.body.bookingId
			}, function (err, result) {
				  if (err) 
				  	next(err);
				  else
				  	res.json({status: "ok", message: "Notification created successfully", data:result});
				  
				});
    },

    getall(req, res) {
      notificationModel.find({userId: req.body.userId}, function(err, notificationInfo){
        if (err) {
         next(err);
        } else {
          // use this exec() method more, it returns a promise so u dont have to do any yeye async awaiting
          userModel.find({}).exec()
          .then(users => {
            usersDictionary = users.reduce((payload, user) => {
              payload[user.id] = user
              return payload
            }, {})

            res.json({
              status:"success",
              message: "ok", 
              data: notificationInfo.map(singleNotification => {
                return { 
                  notification: singleNotification, 
                  from: { 
                    id:usersDictionary[singleNotification.providerId].id, 
                    name: usersDictionary[singleNotification.providerId].fullname, 
                    userPhoto: usersDictionary[singleNotification.providerId].pictureUrl
                  }
                }
              })
            });
          })
        }
      })
    },

     
        deleteById: function(req, res, next) {
          notificationModel.deleteOne({"_id":req.params.notificationId}, function(err, notificationInfo){
           if(err)
            next(err);
           else {
            res.json({status:"success", message: "Notification deleted successfully!!!"});
           }
          });
         },
      

         getById: function(req, res, next) {
            
            notificationModel.findById(req.params.notificationId, function(err, notificationInfo){
             if (err) {
              next(err);
             } else {
              res.json({status:"success", message: "ok", data:{notificationInfo}});
             }
            });
           },


}				