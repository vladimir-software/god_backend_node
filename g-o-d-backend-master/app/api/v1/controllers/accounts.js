const accountModel = require('../models/accounts');
const jwt = require('jsonwebtoken');				

module.exports = {
create: function(req, res, next) {
accountModel.create({ 
userId: req.body.userId, 
accountName: req.body.accountName,
accountNumber: req.body.accountNumber,
sortCode:req.body.sortCode
}, function (err, result) {
if (err) 
next(err);
else
res.json({status: "ok", message: "Bank Account Added", data:result});
});
},


getall:function(req,res,next){
const promise = accountModel.find({userId:req.body.userId}).exec();
promise.then(accounts => res.status(200).send({
success: true,
accounts
}))
.catch(err => res.status(500).send({
success: false,
error: err
}));
},

     
deleteById: function(req, res, next) {
accountModel.deleteOne({"_id":req.params.accountId}, function(err){
if(err)
next(err);
else {
res.json({status:"success", message: "Deleted successfully!!!"});
}
});
},
      
getById: function(req, res, next) {
accountModel.findById(req.params.accountId, function(err, accountInfo){
if (err) {
next(err);
} else {
res.json({status:"success", message: "ok", data:{accountInfo}});
}
});
},

   updateById: function(req, res, next) {    
    accountModel.updateOne({"_id": req.params.accountId}, {
      $set: {
        accountNumber: req.body.accountNumber, 
        accountName: req.body.accountName,
        sortCode: req.body.sortCode
      }
    },
    { new: true },  function(err, accountInfo){
    if(err)
      next(err);
     else {
      res.json({status:"success", message: "Updated successfully", data:accountInfo});
     }
    });
   },

}				