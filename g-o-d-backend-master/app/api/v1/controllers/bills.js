const billModel = require('../models/bills');
const jwt = require('jsonwebtoken');				

module.exports = {
getById: function(req, res, next) {
// billModel.findById(req.body.userId, function(err, billInfo){
// if (err) {
// next(err);
// } else {
// res.json({status:"success", message: "ok", data:{billInfo}});
// }
// });
const promise = billModel.find({userId:req.body.userId}).exec();
promise.then(bills => res.status(200).send({
	  success: true,
	  bills
	}))
	  .catch(err => res.status(500).send({
		success: false,
		error: err
	  }));
},


}				