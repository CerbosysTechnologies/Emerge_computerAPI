const passport = require('passport');
var jimp = require("jimp");
const brandModel = require("../models/brand.model");


const pool = require("../../authorization/config");
const Brand = require('../models/brand.model');



module.exports.insertBrand = function(req,res,next)
{
    passport.authenticate('jwt',function(err,admin)
    {
        console.log("IS Next", admin);
        if (err || !admin) 
        {            
            console.log("admin",err);
            return res.json({ status: 401, success: false, message: "Authentication Fail." });
        }
        else if(admin)
        {
        try
        {    
            if(!req.file){
                res.status(400).send({ success:false, message: 'Please Provide Brand Image.' });        
            }
            else{ 
            var fn = './public/brand/' + req.file.filename;  
             jimp.read(fn, function (err, img) {
             if (err) 
                throw err;
                img.resize(250, 250)            // resize
                .quality(100)              // set JPEG quality       
                .write('./public/brand/' + fn) // save
                console.log('Resized !!')              
            });  
            var brand = new brandModel(req.body,fn);    
            console.log('brand', brand);      
                if(!brand.brand_name){
                    return res.status(400).send({ success:false, message: 'Please Provide Brand Name.' });        
                }
             
                brand.status=1;
                brand.createdById = admin[0].ad_id;
                brand.creationDate = new Date;
                brandModel.insertBrandM(brand, function(err, data) 
                {
                    if(err){
                        res.send({status:400,success:false,message:"Details not saved."});
                    }
                    else{
                        res.send({status:200,success:true,message:data.message});
                    }
                });
            }    
        }catch(e){ console.log("catch",e);   }  }  
  })(req,res,next)
}

//Update Brand
module.exports.updateBrand = function(req,res,next)
{
    passport.authenticate('jwt',function(err,admin)
    {
        if (err || !admin) 
        {            
            console.log("admin",err);
            return res.json({ status: 401, success: false, message: "Authentication Fail." });
        }
        else if(admin)
        {
        try
        {    
            if(!req.file)
            {
                
                var brand = new brandModel(req.body);
                console.log('Brand', brand);    
                if(!brand.brand_name){
                 return  res.status(400).send({ success:false, message: 'Please Provide Brand Name.' });        
                }
               
                brand.status=1;
                brand.modifiedById = admin[0].ad_id;
                brand.modificationDate = new Date;
                brandModel.updateBrandM(req.params.brand_id,brand, function(err, data) 
                {
                    if(err){
                        res.send({status:400,success:false,message:"Details not saved."});
                    }
                    else{
                        res.send({status:200,success:true,message:data.message});
                    }
                });
            }    
            
            else{ 
            var fn = './public/brand/' + req.file.filename;  
             jimp.read(fn, function (err, img) {
             if (err) 
                throw err;
                img.resize(250, 250)            // resize
                .quality(100)              // set JPEG quality       
                .write('./public/brand/' + fn) // save
                console.log('Resized !!')              
            });  
            var brand= new brandModel(req.body,fn);
            console.log('Update Brand', brand);    

            if(!brand.brand_name){
               return res.status(400).send({ success:false, message: 'Please Provide Brand Name.' });        
            }
            brand.status=1;
            brand.modifiedById = admin[0].ad_id;
            brand.modificationDate = new Date;
            Brand.updateBrandM(req.params.brand_id,brand, function(err, data) 
            {
                if(err){
                        res.send({status:400,success:false,message:"Details not saved."});
                }
                else{
                    res.send({status:200,success:true,message:data.message});
                }
             });
            }    
        }catch(e){ console.log("catch",e);   }  }  
  })(req,res,next)
}

// Get All Brand
module.exports.getAllBrand = function(req,res,next)

{
    passport.authenticate('jwt',function(err,admin)
    {
        if (err || !admin) 
        {          
            return res.json({ status: 401, success: false, message: "Authentication Fail." });
        }
        else if(admin){ 
            brandModel.getAllBrand(function(err,data){
                if(err){
                    res.send({status:400,success:false,message:"No Brand Details Found"});
                }
                else if(data.length==0){
                    res.send({status:200,success:true,message:"No Brand Details Available"});
                }
                else{
                    res.send({status:200,success:true,message:
                    "Speed Details Found", data:data});
                }
            });
      }
  })(req,res,next)
}

// Get Speed ById
module.exports.getBrandById = function(req,res,next)
{
    passport.authenticate('jwt',function(err,admin)
    {
        if (err || !admin) 
        {          
            return res.json({ status: 401, success: false, message: "Authentication Fail." });
        }
        else if(admin){ 
            brandModel.getBrandByIdM(req.params.brand_id,function(err,data){
                if(err){
                    res.send({status:400,success:false,message:"No Detail Found"});
                }
                else if(data.length==0){
                    res.send({status:200,success:true,message:"No Detail Available"});
                } 
                else{
                    res.send({status:200,success:true,message:
                    "Detail Found", data:data});
                }
            });
       }
  })(req,res,next)
};