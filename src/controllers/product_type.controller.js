const passport=require('passport')
var jimp = require("jimp");
const path=require('path')
require("../../authorization/passport")(passport)
const productTypeModel = require("../models/product_type.model");




//Add ProductType
module.exports.insertProductType = function(req,res,next)
{
    passport.authenticate('jwt',function(err,user)
    {
        console.log("IS Next", user);
        if (err || !user) 
        {            
            console.log("User",err);
            return res.json({ status: 401, success: false, message: "Authentication Fail." });
        }
        else if(user)
        {
        try
        {    
            if(!req.file){
                res.status(400).send({ success:false, message: 'Please Provide ProductType Image.' });        
            }
            else{ 
            var fn = './public/product_type/' + req.file.filename;  
             jimp.read(fn, function (err, img) {
             if (err) 
                throw err;
                img.resize(250, 250)            // resize
                .quality(100)              // set JPEG quality       
                .write('./public/product_type/' + fn) // save
                console.log('Resized !!')              
            });  
            var productType= new productTypeModel(req.body,fn);    
            console.log('CD', productType);      
                if(!productType.product_type_name){
                    return res.status(400).send({ success:false, message: 'Please Provide Design Code.' });        
                }
                
                productType.statusId=1;
                productType.createdById = user[0].ad_id;
                productType.creationDate = new Date;
                productTypeModel.addProductType(productType, function(err, data) 
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






















//Get All ProductType
module.exports.getAllProductType = function(req,res,next)
{
    passport.authenticate('jwt',function(err,user)
    {
        if (err || !user) 
        {          
            return res.json({ status: 401, success: false, message: "Authentication Fail." });
        }
        else if(user){ 
            productTypeModel.getAllProductTypeM(function(err,data){
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
}


//  get ProductType ById
module.exports.getProductTypeById = function(req,res,next)
{
    passport.authenticate('jwt',function(err,user)
     {
        if (err || !user) 
        {          
             return res.json({ status: 401, success: false, message: "Authentication Fail." });
        }
        else if(user){ 
            productTypeModel.getProductTypeByIdM(req.params.product_type_id,function(err,data){
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


// Update.ProductType
module.exports.updateProductType= function(req,res,next)
{
    passport.authenticate('jwt',function(err,user)
    {
        if (err || !user) 
        {            
            console.log("user",err);
            return res.json({ status: 401, success: false, message: "Authentication Fail." });
        }
        else if(user)
        {
        try
        {    
            if(!req.file)
            {
                
                var pt = new productTypeModel(req.body);
                console.log('Brand', pt);    
                if(!pt.product_type_name){
                 return res.status(400).send({ success:false, message: 'Please Provide Product Type Name.' });        
                }
               
                pt.statusId=1;
                pt.modifiedById = user[0].ad_id;
                pt.modificationDate = new Date;
                productTypeModel.updateProductType(req.params.product_type_id,pt, function(err, data) 
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
            var fn = './public/product_type/' + req.file.filename;  
             jimp.read(fn, function (err, img) {
             if (err) 
                throw err;
                img.resize(250, 250)            // resize
                .quality(100)              // set JPEG quality       
                .write('./public/product_type/' + fn) // save
                console.log('Resized !!')              
            });  
            var pt= new productTypeModel(req.body,fn);
            console.log('Update product Type', pt);    

            if(!pt.product_type_name){
               return res.status(400).send({ success:false, message: 'Please Provide Product Type.' });        
            }
            pt.status=1;
            pt.modifiedById = user[0].ad_id;
            pt.modificationDate = new Date;
            productTypeModel.updateProductType(req.params.product_type_id,pt, function(err, data) 
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


//  get ProductType ById
module.exports.getProductTypeByName = function(req,res,next)
{
    passport.authenticate('jwt',function(err,user)
     {
        if (err || !user) 
        {          
             return res.json({ status: 401, success: false, message: "Authentication Fail." });
        }
        else if(user){ 
            productTypeModel.getProductTypeByName(req.params.product_type_name,function(err,data){
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