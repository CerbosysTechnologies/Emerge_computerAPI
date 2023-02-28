
const colorModel = require("../models/color.model")
const passport = require('passport');
require("../../authorization/passport")(passport)

// Add Color
exports.addColor=function(req,res,next){
    passport.authenticate('jwt',function(err,user){
        console.log("Is Next",user)
        if(err|| !user){
            console.log("admin",err);
            return res.json({ status: 401, success: false, message: "Authentication Fail." });
        }
        else if(user){
            try {
                var colordata=new colorModel(req.body);
               if(!colordata.color_name){
                    return res.status(400).send({ success:false, message: 'Please Provide Color Name.' });        
                }

                colordata.statusId=1;
                colordata.createdById = user[0].ad_id;
                colordata.creationDate = new Date;

                colorModel.addColorM(colordata,(err,color)=>{
                    if(err){
                        res.send({status:400,success:false,message:color.message});
                    }
                    else{
                        res.send({status:200,success:true,message:color.message,});
                    }
                })
                
            } catch (error) {
                console.log("catch",error); 
            }
            
        }

    })(req,res,next)

}



// Get All Color
module.exports.getAllColor = function(req,res,next)

{
    
    // passport.authenticate('jwt',function(err,user)
    // {
    //     if (err || !user) 
    //     {          
    //         return res.json({ status: 401, success: false, message: "Authentication Fail." });
    //     }
    //     else if(user){ 
            colorModel.getAllColorM(function(err,data){
                if(err){
                    res.send({status:400,success:false,message:"No Color Found"});
                }
                else if(data.length==0){
                    res.send({status:200,success:true,message:"No Color Available"});
                }
                else{
                    res.send({status:200,success:true,message:
                    "Color Found", data:data});
                }
            });
      }
//   })(req,res,next)
// }


// Get Color By Id
module.exports.getColorById = function(req,res,next)
{
    // passport.authenticate('jwt',function(err,user)
    // {
    //     if (err || !user) 
    //     {          
    //         return res.json({ status: 401, success: false, message: "Authentication Fail." });
    //     }
    //     else if(user){ 
            colorModel.getColorByIdM(req.params.color_id,function(err,data){
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
//   })(req,res,next)
// };



module.exports.updateColor = function(req,res,next)
{
    passport.authenticate('jwt',function(err,user)
    {
        if (err || !user) 
        {          
            return res.json({ status: 401, success: false, message: "Authentication Fail." });
        }
        else if(user){        
        var colordata = new colorModel(req.body);                 
       if(!colordata.color_name)
        {
            return res.status(400).send({ error:true, message: 'Please Provide Color Name.' });        
        }        
        colordata.modifiedById = user[0].ad_id;
        colordata.modificationDate = new Date;
        colorModel.updateColorM(req.params.color_id,colordata,function(err, data) 
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
   

// Get Color By Name
module.exports.getColorByName = function(req,res,next)
{
    // passport.authenticate('jwt',function(err,user)
    // {
    //     if (err || !user) 
    //     {          
    //         return res.json({ status: 401, success: false, message: "Authentication Fail." });
    //     }
    //     else if(user){ 
            colorModel.getColorByName(req.params.color_name,function(err,data){
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
//   })(req,res,next)
// };
