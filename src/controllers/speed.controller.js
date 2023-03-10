const passport=require('passport');
const speedModel = require('../models/speed.model');
require("../../authorization/passport")(passport)




// Add Color
exports.insertSpeed=function(req,res,next){
    passport.authenticate('jwt',function(err,user){
        console.log("Is Next",user)
        if(err|| !user){
            console.log("admin",err);
            return res.json({ status: 401, success: false, message: "Authentication Fail." });
        }
        else if(user){
            try {
                var speed=new speedModel(req.body);
               if(!speed.speed_name){
                    return res.status(400).send({ success:false, message: 'Please Provide Speed Name.' });        
                }

                speed.statusId=1;
                speed.createdById = user[0].ad_id;
                speed.creationDate = new Date;

              speedModel.addSpeed(speed,(err,speed)=>{
                    if(err){
                        res.send({status:400,success:false,message:speed.message});
                    }
                    else{
                        res.send({status:200,success:true,message:speed.message,});
                    }
                })
                
            } catch (error) {
                console.log("catch",error); 
            }
            
        }

    })(req,res,next)

}


// Get All Speed 
module.exports.getAllSpeed = function(req,res,next)

{
    // passport.authenticate('jwt',function(err,user)
    // {
    //     if (err || !user) 
    //     {          
    //         return res.json({ status: 401, success: false, message: "Authentication Fail." });
    //     }
    //     else if(user){ 
            speedModel.getAllSpeedM(function(err,data){
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
//   })(req,res,next)
// }




// Get Speed ById
module.exports.getSpeedById = function(req,res,next)
{
    passport.authenticate('jwt',function(err,user)
    {
        if (err || !user) 
        {          
            return res.json({ status: 401, success: false, message: "Authentication Fail." });
        }
        else if(user){ 
            speedModel.getSpeedByIdM(req.params.speed_id,function(err,data){
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


module.exports.updateSpeed = function(req,res,next)
{
    passport.authenticate('jwt',function(err,user)
    {
        if (err || !user) 
        {          
            return res.json({ status: 401, success: false, message: "Authentication Fail." });
        }
        else if(user){        
        var speed = new speedModel(req.body);                 
           
        speed.modifiedById = user[0].ad_id;
        speed.modificationDate = new Date;
        speedModel.updateSpeedM(req.params.speed_id,speed,function(err, data) 
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




// /Get Speed By Name
module.exports.getSpeedByName = function(req,res,next)
{
    passport.authenticate('jwt',function(err,user)
    {
        if (err || !user) 
        {          
            return res.json({ status: 401, success: false, message: "Authentication Fail." });
        }
        else if(user){ 
            speedModel.getSpeedByName(req.params.speed_name,function(err,data){
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
