const passport = require('passport');
var jimp = require("jimp");
const brandModel = require("../models/brand.model");


// //Addbrand
// module.exports.insertBrand= function(req,res,next)
// {
//     passport.authenticate('jwt',function(err,user)
//     {
//         console.log("IS Next", user);
//         if (err || !user) 
//         {            
//             console.log("user",err);
//             return res.json({ status: 401, success: false, message: "Authentication Fail." });
//         }
//         else if(user){               
//         var brand = new brandModel(req.body);                
//         if(!brand.brand_name)
//         {
//             return res.status(400).send({ error:true, message: 'Please Provide Brand Name details.' });        
//         }
//         else  if(!req.file){
//             res.status(400).send({ success:false, message: 'Please Provide Brand Image.' });        
//         }
//         else{
//             var fn = './public/brand/' + req.file.filename;  
//             jimp.read(fn, function (err, img) {
//             if (err) 
//                throw err;
//                img.resize(250, 250)            // resize
//                .quality(100)              // set JPEG quality       
//                .write('./public/brand/' + fn) // save
//                console.log('Resized !!')              
//            });
//         }
       
//        brand.statusId=1;
//        brand.createdById = user[0].ad_id;
//        brand.creationDate = new Date;
//        brand.brand_image=req.file.path;
//        brandModel.addBrand(brand, function(err, data) 
//         {
//             if(err){
//                 res.send({status:400,success:false,message:data.message});
//             }
//             else{
//                 res.send({status:200,success:true,message:data.message});
//             }
//         });
//     }    
//   })(req,res,next)
// }


//Add ProductType
module.exports.insertBrand = function(req,res,next)
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
            var brand= new brandModel(req.body,fn);    
            console.log('brand', brand);      
                if(!brand.brand_name){
                    return res.status(400).send({ success:false, message: 'Please Provide Brand.' });        
                }
                
                brand.statusId=1;
                brand.createdById = user[0].ad_id;
                brand.creationDate = new Date;
                brandModel.addBrand(brand, function(err, data) 
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
                
                var brand = new brandModel(req.body);
                console.log('Brand', brand);    
                if(!brand.brand_name){
                 return  res.status(400).send({ success:false, message: 'Please Provide Brand Name.' });        
                }
               
                brand.status=1;
                brand.modifiedById = user[0].ad_id;
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
            brand.modifiedById = user[0].ad_id;
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
        }catch(e){ console.log("catch",e);   }  }  
  })(req,res,next)
}

// Get All Brand
module.exports.getAllBrand = function(req,res,next)

{
    passport.authenticate('jwt',function(err,user)
    {
        if (err || !user) 
        {          
            return res.json({ status: 401, success: false, message: "Authentication Fail." });
        }
        else if(user){ 
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

// Get Brand ById
module.exports.getBrandById = function(req,res,next)
{
    passport.authenticate('jwt',function(err,user)
    {
        if (err || !user) 
        {          
            return res.json({ status: 401, success: false, message: "Authentication Fail." });
        }
        else if(user){ 
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



// Get Brand By  Name
module.exports.getBrandByName = function(req,res,next)
{
    passport.authenticate('jwt',function(err,user)
    {
        if (err || !user) 
        {          
            return res.json({ status: 401, success: false, message: "Authentication Fail." });
        }
        else if(user){ 
            brandModel.getBrandByName(req.params.brand_name,function(err,data){
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