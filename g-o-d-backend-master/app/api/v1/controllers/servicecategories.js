const serviceModel = require('../models/servicecategories');
const jwt = require('jsonwebtoken');				
var cloud = require('../../../../config/cloudinary');
const multer = require('multer')

module.exports = {

  create:function(req, res, next){
    try{
    var imageDetails = {
      serviceName: req.body.serviceName, 
      metaDescription: req.body.metaDescription,
      picture: req.files[0].path,
      }
      console.log(imageDetails.picture)
    //console.log(req.body.picture)
  cloud.uploads(imageDetails.picture).then((result) => {
    console.log(result)
    var imageDetails = {
      serviceName: req.body.serviceName, 
      metaDescription: req.body.metaDescription,
      pictureUrl: result.url
      }
      serviceModel.create({
        serviceName: imageDetails.serviceName, 
        metaDescription: imageDetails.metaDescription,
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
	// create: function(req, res, next) {
	// 	serviceModel.create(
	// 		{ serviceName: req.body.serviceName, 
  //       metaDescription: req.body.metaDescription,
  //       pictureUrl: req.body.pictureUrl
	// 		}, function (err, result) {
	// 			  if (err) 
	// 			  	next(err);
	// 			  else
	// 			  	res.json({status: "ok", message: "service category created successfully"});
				  
	// 			});
  //   },
   
  // getall(req, res) {
  //       const promise = serviceModel.find().exec();
  //       promise.then(services => res.status(200).send({
  //         success: true,
  //         services
  //       }))
  //         .catch(err => res.status(500).send({
  //           success: false,
  //           error: err
  //         }));
  //     },

      getall: function(req, res, next) {
        //let List = [];
      serviceModel.find({}, function(err, services){
         if (err){
          next(err);
         } else{
          // for (let service of services) {
          //  List.push({id: service._id, serviceName: service.serviceName, released_on: movie.released_on});
          // }
          console.log(services)
          res.json({status:"success",  data:services});
             
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
          serviceModel.updateOne({"_id":req.params.serviceId},{serviceName: req.body.serviceName, 
            metaDescription: req.body.metaDescription,
            pictureUrl: req.body.pictureUrl}, function(err, serviceInfo){
        if(err)
            next(err);
           else {
            res.json({status:"success", message: "Service category updated successfully!!!"});
           }
          });
         },


}				