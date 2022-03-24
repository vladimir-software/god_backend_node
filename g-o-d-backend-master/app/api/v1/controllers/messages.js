const messageModel = require('../models/messages');
const conversationModel = require('../models/conversation')
const userModel = require('../models/user')
	

module.exports = {
create: function(req, res, next) {
conversationModel.findOne({clientId: req.body.clientId, 
providerId:req.body.providerId 
}, function (err, conversation) {
if (conversation !== null){
res.json({status: "ok", message: "Conversation Started", data:conversation});
}
else{
conversationModel.create({
clientId: req.body.clientId,
providerId: req.body.providerId,
clientstatus:1
}, function (err, result) {
if (err) 
next(err);
else
res.json({status: "ok", message: "Conversation Started", data:result});
});
}
})
},

createmessage: function(req, res, next) {
messageModel.create({
userId: req.body.userId,
conversationId:req.body.conversationId,
body: req.body.body}, function (err, result) {
if (err) 
next(err);
else
if (req.body.role = 'client'){
conversationModel.updateOne({"_id":req.body.conversationId},{
$set:{
providerstatus:0,
clientstatus:1    
}
}).exec().then((convo)=>{
res.json({status: "ok", message: "Message sent", data:result});
})
}
else if (req.body.role = 'provider'){
conversationModel.updateOne({"_id":req.body.conversationId},{
$set:{
providerstatus:1,
clientstatus:0      
}
}).exec().then((convo)=>{
res.json({status: "ok", message: "Message sent", data:result});
})
}
});
},
   
getMessages(req, res, next){
messageModel.find({conversationId: req.params.conversationId}, function(err, result){
if(err){
next(err);
} 
else{
if (req.body.role = 'client'){
  conversationModel.updateOne({"_id":req.params.conversationId},{
    $set:{
    clientstatus:1     
    }
    }).exec().then((convo)=>{
      userModel.find({}).exec()
    .then(users => {
      usersDictionary = users.reduce((payload, user) => {
        payload[user.id] = user
        return payload
      }, {})
  
      res.json({
        status:"success",
        message: "ok", 
        data: result.map(singleMessage => {
          return { 
            message: singleMessage, 
            from: { 
              name: usersDictionary[singleMessage.userId].fullname, 
              userPhoto: usersDictionary[singleMessage.userId].pictureUrl
            }
          }
        })
      });
    })
    }
    )
}
else if (req.body.role = 'provider'){
  conversationModel.updateOne({"_id":req.body.conversationId},{
    $set:{
    providerstatus:1
    }
    }).exec().then((convo)=>{
      userModel.find({}).exec()
    .then(users => {
      usersDictionary = users.reduce((payload, user) => {
        payload[user.id] = user
        return payload
      }, {})
  
      res.json({
        status:"success",
        message: "ok", 
        data: result.map(singleMessage => {
          return { 
            message: singleMessage, 
            from: { 
              name: usersDictionary[singleMessage.userId].fullname, 
              userPhoto: usersDictionary[singleMessage.userId].pictureUrl
            }
          }
        })
      });
    })
    }
    )
}
userModel.find({}).exec()
    .then(users => {
      usersDictionary = users.reduce((payload, user) => {
        payload[user.id] = user
        return payload
      }, {})
  
      res.json({
        status:"success",
        message: "ok", 
        data: result.map(singleMessage => {
          return { 
            message: singleMessage, 
            from: { 
              name: usersDictionary[singleMessage.userId].fullname, 
              userPhoto: usersDictionary[singleMessage.userId].pictureUrl
            }
          }
        })
      });
    })

}
});
},

// create:function(req, res, next){
// try{
// var imageDetails = {
// userId:req.body.userId,
// serviceName: req.body.serviceName, 
// description: req.body.description,
// amount:req.body.amount,
// duration: req.body.duration,
// picture: req.files[0].path,
// }
// cloud.uploads(imageDetails.picture).then((result) => {
// console.log(result)
// var imageDetails = {
// userId:req.body.userId,
// serviceName: req.body.serviceName, 
// description: req.body.description,
// amount:req.body.amount,
// duration: req.body.duration,
// pictureUrl: result.url
// }
// serviceModel.create({
// userId:imageDetails.userId,
// serviceName: imageDetails.serviceName, 
// description: imageDetails.description,
// amount:imageDetails.amount,
// duration: imageDetails.duration,
// pictureUrl: imageDetails.pictureUrl
// },function(err, created){
// if(err){
// res.json({
// err: err,
// message: 'could not add, try again'
// })
// }
// else {
// res.json({
// data: created,
// message: "created successfully!!"
// })
// }
// })
// })
// }
// catch(execptions){
// console.log(execptions)
// }
// },

getProviderMessages(req, res, next) {
conversationModel.find({providerId: req.params.providerId}, function(err, result){
if (err) {
next(err);
} else {
userModel.find({}).exec()
    .then(users => {
      usersDictionary = users.reduce((payload, user) => {
        payload[user.id] = user
        return payload
      }, {})
  
      res.json({
        status:"success",
        message: "ok", 
        data: result.map(singleMessage => {
          return { 
            message: singleMessage, 
            from: { 
              name: usersDictionary[singleMessage.clientId].fullname, 
              userPhoto: usersDictionary[singleMessage.clientId].pictureUrl
            }
          }
        })
      });
    })   
//res.json({status:"success", message: "ok", data:result});
}
});
},

getClientMessages(req, res, next) {
conversationModel.find({clientId: req.params.clientId}, function(err, result){
if (err) {
next(err);
} 
else{
userModel.find({}).exec()
.then(users => {
usersDictionary = users.reduce((payload, user) => {
payload[user.id] = user
return payload
}, {})
res.json({
status:"success",
message: "ok", 
data: result.map(singleMessage => {
return { 
message: singleMessage, 
from: { 
name: usersDictionary[singleMessage.providerId].fullname, 
userPhoto: usersDictionary[singleMessage.providerId].pictureUrl
}
}
})
});
})  
}
});
},

}				