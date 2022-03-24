const testimonialModel = require('../models/testimonial');
const jwt = require('jsonwebtoken');
var cloud = require('../../../../config/cloudinary');
const multer = require('multer')				

module.exports = {
    create:function(req, res, next){
        try{
        var imageDetails = {
          fullname: req.body.fullname, 
          body: req.body.body,
          userLocation:req.body.userLocation,
          picture: req.files[0].path,
          
          }
     
      cloud.uploads(imageDetails.picture).then((result) => {
       // console.log(result)
        var imageDetails = {
            fullname: req.body.fullname, 
            body: req.body.body,
            userLocation:req.body.userLocation,
          pictureUrl: result.url
          }
          testimonialModel.create({
            fullname: imageDetails.fullname, 
          body: imageDetails.body,
          userLocation:imageDetails.userLocation,
            pictureUrl: imageDetails.pictureUrl
          },function(err, created){
            if(err){
            res.status(400).json({status:"error", message: 'Error Adding Testimonial'});
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


getall:function(req,res,next){
        const promise = testimonialModel.find().exec();
        promise.then(testimonials => res.status(200).send({
              success: true,
              testimonials
            }))
              .catch(err => res.status(500).send({
                success: false,
                error: err
              }));
        },

     
        deleteById: function(req, res, next) {
          testimonialModel.deleteOne({"_id":req.params.testimonialId}, function(err){
           if(err)
            next(err);
           else {
            res.json({status:"success", message: "Deleted successfully!!!"});
           }
          });
         },
      

         getById: function(req, res, next) {
            testimonialModel.findById(req.params.testimonialId, function(err, testimonialInfo){
             if (err) {
              next(err);
             } else {
              res.json({status:"success", message: "ok", data:{testimonialInfo}});
             }
            });
           },


}				