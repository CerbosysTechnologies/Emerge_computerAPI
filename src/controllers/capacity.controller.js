const passport = require('passport');
var jimp = require("jimp");
const capacityModel = require('../models/capacity.model');



// Insert Capacity
module.exports.insertCategory = function(req,res,next)
{
    passport.authenticate('jwt',function(err,user)
    {
        console.log("IS Next", user);
        if (err || !user) 
        {            
            console.log("User",err);
            return res.json({ status: 401, success: false, message: "Authentication Fail." });
        }
        else if(user){               
        var capacity = new capacityModel(req.body);                
        if(!capacity.capacity_name)
        {
            return res.status(400).send({ error:true, message: 'Please Provide Capacity Name.' });        
        }
        capacity.statusId=1;
        capacity.createdById = user[0].ad_id;
        capacity.creationDate = new Date;
        capacityModel.createCapacity(capacity, function(err, data) 
        {
            if(err)
            {
                res.send({status:400,success:false,message:data.message});
            }
            else{
                res.send({status:200,success:true,message:data.message});
            }
        }); 
      
    }
    
  })(req,res,next)
}






// Update Capacity
module.exports.updateCapacity = function(req,res,next)
{
    passport.authenticate('jwt',function(err,user)
    {
        if (err || !user) 
        {          
            return res.json({ status: 401, success: false, message: "Authentication Fail." });
        }
        else if(user){        
        var capacity = new capacityModel(req.body);                 
           if(!capacity.capacity_name){
            return res.status(400).send({ success:false, message: 'Please Provide Capacity Name.' })
           }
        capacity.modifiedById = user[0].ad_id;
        capacity.modificationDate = new Date;
        capacityModel.updateCapacityM(req.params.capacity_id,capacity,function(err, data) 
        {
            if(err){
                res.send({status:400,success:false,message:"Details Not Updated."});
            }
            else{
                res.send({status:200,success:true,message:data.message});
            }
        }); 
      
    }
    
  })(req,res,next)
};

// Get All Capacity
module.exports.getAllCapacity = function(req,res,next)

{
    passport.authenticate('jwt',function(err,user)
    {
        if (err || !user) 
        {          
            return res.json({ status: 401, success: false, message: "Authentication Fail." });
        }
        else if(user){ 
            capacityModel.getAllCapacityM(function(err,data){
                if(err){
                    res.send({status:400,success:false,message:"No Capacity Details Found"});
                }
                else if(data.length==0){
                    res.send({status:200,success:true,message:"No Capacity Details Available"});
                }
                else{
                    res.send({status:200,success:true,message:
                    "Speed Details Found", data:data});
                }
            });
      }
  })(req,res,next)
}


// Get Capacity ById
module.exports.getCapacityById = function(req,res,next)
{
    passport.authenticate('jwt',function(err,user)
    {
        if (err || !user) 
        {          
            return res.json({ status: 401, success: false, message: "Authentication Fail." });
        }
        else if(user){ 
            capacityModel.getCapacityById(req.params.capacity_id,function(err,data){
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



// Get Capacity By Name
module.exports.getCapacityByName = function(req,res,next)
{
    passport.authenticate('jwt',function(err,user)
    {
        if (err || !user) 
        {          
            return res.json({ status: 401, success: false, message: "Authentication Fail." });
        }
        else if(user){ 
            capacityModel.getCapacityByName(req.params.capacity_name,function(err,data){
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