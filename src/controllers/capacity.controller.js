const passport = require('passport');
var jimp = require("jimp");
const capacityModel = require('../models/capacity.model');




module.exports.insertCapacity= function(req,res,next)
{
    passport.authenticate('jwt',function(err,admin)
    {
        console.log("IS Next", admin);
        if (err || !admin) 
        {            
            console.log("admin",err);
            return res.json({ status: 401, success: false, message: "Authentication Fail." });
        }
        else if(admin){               
        var capacity = new capacityModel(req.body); 

        if(!capacity.capacity_name)
        {
            return res.status(400).send({ error:true, message: 'Please Capacity Name Details.' });        
        }
      
     
       
        capacity.status=1;
        capacity.createdById= admin[0].ad_id;
        capacity.creationDate = new Date;
       
        capacityModel.insertCapacity(capacity, function(err, data) 
        {
            if(err){
                res.send({status:400,success:false,message:"Details not saved."});
            }
            else{
                res.send({status:200,success:true,message:data.message});
            }
        });
    }    
  })(req,res,next)
}


module.exports.updateCapacity = function(req,res,next)
{
    passport.authenticate('jwt',function(err,admin)
    {
        if (err || !admin) 
        {          
            return res.json({ status: 401, success: false, message: "Authentication Fail." });
        }
        else if(admin){        
        var capacity = new capacityModel(req.body);                 
           if(!capacity.capacity_name){
            return res.status(400).send({ success:false, message: 'Please Provide Capacity Name.' })
           }
        capacity.modifiedById = admin[0].ad_id;
        capacity.modificationDate = new Date;
        capacityModel.updateCapacityM(req.params.capacity_id,capacity,function(err, data) 
        {
            if(err){
                res.send({status:400,success:false,message:"Details Not Saved."});
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
    passport.authenticate('jwt',function(err,admin)
    {
        if (err || !admin) 
        {          
            return res.json({ status: 401, success: false, message: "Authentication Fail." });
        }
        else if(admin){ 
            capacityModel.getAllCapacityM(function(err,data){
                if(err){
                    res.send({status:400,success:false,message:"No Speed Details Found"});
                }
                else if(data.length==0){
                    res.send({status:200,success:true,message:"No Speed Details Available"});
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
    passport.authenticate('jwt',function(err,admin)
    {
        if (err || !admin) 
        {          
            return res.json({ status: 401, success: false, message: "Authentication Fail." });
        }
        else if(admin){ 
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