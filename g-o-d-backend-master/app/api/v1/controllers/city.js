const cityModel = require('../models/city');
const jwt = require('jsonwebtoken');				

module.exports = {
	create: function(req, res, next) {
    //const postcode = 
		cityModel.create(
			{ postCode: req.body.postCode.toUpperCase(), 
            city: req.body.city,
        country: req.body.country,
        status:req.body.status
			}, function (err, result) {
				  if (err) 
				  	next(err);
				  else
				  	res.json({status: "ok", message: "City created successfully", data:result});
				  
				});
    },
    getall:function(req,res,next){
        const promise = cityModel.find().exec();
        promise.then(cities => res.status(200).send({
              success: true,
              cities
            }))
              .catch(err => res.status(500).send({
                success: false,
                error: err
              }));
        },
    
    getpostcode:function(req,res,next){
        cityModel.findOne({"postCode":req.body.postCode.substring(0,3).toUpperCase()})
        .exec().then((city) => {
				res.json({
					city: city ? true : false,

					})
				}
			)	
		
    },

     
        deleteById: function(req, res, next) {
          cityModel.deleteOne({"_id":req.params.cityId}, function(err){
           if(err)
            next(err);
           else {
            res.json({status:"success", message: "Deleted successfully!!!"});
           }
          });
         },
      

         getById: function(req, res, next) {
            cityModel.findById(req.params.cityId, function(err, cityInfo){
             if (err) {
              next(err);
             } else {
              res.json({status:"success", message: "ok", data:{cityInfo}});
             }
            });
           },
           updateById: function(req, res, next) {
            
            cityModel.updateOne({"_id": req.params.cityId}, {
              
              $set: {
                postCode: req.body.postCode, 
            city: req.body.city,
        country: req.body.country,
        status:req.body.status
              }
            
            },
            { new: true },  function(err, cityInfo){
            if(err)
              next(err);
             else {
              res.json({status:"success", message: "City updated successfully", data:cityInfo});
             }
            });
           },

}				