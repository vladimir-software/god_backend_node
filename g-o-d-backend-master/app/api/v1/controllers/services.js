const serviceModel = require('../models/services');
const jwt = require('jsonwebtoken');		
var cloud = require('../../../../config/cloudinary');
const multer = require('multer')		

module.exports = {
	// create: function(req, res, next) {
	// 	serviceModel.create(
	// 		{ userId: req.body.userId,
  //       serviceName: req.body.serviceName, 
  //       description: req.body.description,
  //       amount:req.body.amount,
  //       duration: req.body.duration,
  //       pictureUrl: req.body.pictureUrl
	// 		}, function (err, result) {
	// 			  if (err) 
	// 			  	next(err);
	// 			  else
	// 			  	res.json({status: "ok", message: "service created successfully"});
				  
	// 			});
  //   },
  create:function(req, res, next){
    try{
    var imageDetails = {
      userId:req.body.userId,
      serviceName: req.body.serviceName, 
      description: req.body.description,
      amount:req.body.amount,
      duration: req.body.duration,
      status:req.body.status,
      serviceCategoryId:req.body.category,
      picture: req.files[0].path,
      
      }
    // console.log(imageDetails.picture)
    //console.log(req.body.picture)
  cloud.uploads(imageDetails.picture).then((result) => {
   // console.log(result)
    var imageDetails = {
      userId:req.body.userId,
      serviceName: req.body.serviceName, 
      description: req.body.description,
      amount:req.body.amount,
      status:req.body.status,
      duration: req.body.duration,
      serviceCategoryId:req.body.category,
      pictureUrl: result.url
      }
      serviceModel.create({
        userId:imageDetails.userId,
        serviceName: imageDetails.serviceName, 
        description: imageDetails.description,
        status:imageDetails.status,
        amount:imageDetails.amount,
        duration: imageDetails.duration,
        serviceCategoryId:imageDetails.serviceCategoryId,
        pictureUrl: imageDetails.pictureUrl
      },function(err, created){
        if(err){
        res.json({
        err: err,
        message: 'could not add, try again'
        })
        }
        else {
        res.json({
        data: created,
        message: "created successfully!!"
        })
        }
      })
    })
  }
    catch(execptions){
      console.log(execptions)
    }
        
  },
  
  getall(req, res) {
      serviceModel.find({userId: req.params.userId}, function(err, services){
        if (err) {
         next(err);
        } else {
         res.json({status:"success", message: "ok", data:{services}});
        }
       });
      },

      getproviderservices(req, res) {
        serviceModel.find({userId: req.params.providerId, status:'active'}, function(err, services){
          if (err) {
           next(err);
          } else {
           res.json({status:"success", message: "ok", data:{services}});
          }
         });
        },

      gettrends(req, res){
        serviceModel.find({}, function(err, result){
          if (err){
           next(err);
          } else{
          // console.log(services)
           res.json({status:"success", data:result});
              
          }
       });
      },

     
        deleteById: function(req, res, next) {
          serviceModel.deleteOne({"_id":req.params.serviceId}, function(err, serviceInfo){
           if(err)
            next(err);
           else {
            res.json({status:"success", message: "Service deleted successfully!!!"});
           }
          });
         },
      

         updateById: function(req, res, next) {
          
          serviceModel.updateOne({"_id": req.params.serviceId}, {
            
            $set: {
              serviceName: req.body.serviceName, 
              description: req.body.description,
              pictureUrl: req.body.pictureUrl, 
              status:req.body.status,
              amount:req.body.amount,
              duration:req.body.duration,
              status:req.body.status
            }
          
          },
          { new: true },  function(err, serviceInfo){
          if(err)
            next(err);
           else {
            res.json({status:"success", message: "Service updated successfully", data:serviceInfo});
           }
          });
         },

         uploadImage: function(req, res, next) {
          try{
            var imageDetails = {
              picture: req.files[0].path,
              }
          cloud.uploads(imageDetails.picture).then((result) => {
            if (result){
              res.json({
                data: result.url,
                message: "created successfully"
                })
            }
            else{
              res.status(401).json({status:"error", message: "Image upload failed"});	
            }
         })
       }
    catch(execptions){
      console.log(execptions)
    }
  }


}				