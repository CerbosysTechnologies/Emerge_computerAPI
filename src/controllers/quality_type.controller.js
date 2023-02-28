const passport = require("passport");
const qualityModel = require("../models/qualityType.model");
require("../../authorization/passport")(passport);






// Add Quality Type
exports.insertQualityType=function(req,res,next){
    passport.authenticate('jwt',function(err,user){
        console.log("Is Next",user)
        if(err|| !user){
            console.log("admin",err);
            return res.json({ status: 401, success: false, message: "Authentication Fail." });
        }
        else if(user){
            try {
                var qualityType=new qualityModel(req.body);
               if(!qualityType.quality_type_name){
                    return res.status(400).send({ success:false, message: 'Please Provide Quality Name.' });        
                }

                qualityType.statusId=1;
                qualityType.createdById = user[0].ad_id;
                qualityType.creationDate = new Date;

              qualityModel.insertQuality(qualityType,(err,quality)=>{
                    if(err){
                        res.send({status:400,success:false,message:quality.message});
                    }
                    else{
                        res.send({status:200,success:true,message:quality.message,});
                    }
                })
                
            } catch (error) {
                console.log("catch",error); 
            }
            
        }

    })(req,res,next)

}

        quality.status = 1;
        quality.createdById = admin[0].ad_id;
        quality.creationDate = new Date();

        qualityModel.insertQualityTypeM(quality, (err, data) => {
          if (err) {
            res.send({ status: 400, success: false, message: "" });
          } else {
            res.send({
              status: 200,
              success: true,
              message: data.message,
              data: data,
            });
          }
        });
      } catch (error) {
        console.log("catch", error);
      }
    }
  })(req, res, next);
};

// Get All Quality TYpe
module.exports.getAllQualityType = function(req,res,next)

{
    passport.authenticate('jwt',function(err,user)
    {
        if (err || !user) 
        {          
            return res.json({ status: 401, success: false, message: "Authentication Fail." });
        }
        else if(user){ 
            qualityModel.getAllQualityTypeM(function(err,data){
                if(err){
                    res.send({status:400,success:false,message:"No  Details Found"});
                }
                else if(data.length==0){
                    res.send({status:200,success:true,message:"No  Details Available"});
                }
                else{
                    res.send({status:200,success:true,message:
                    "Details Found", data:data});
                }
            });
      }
  })(req,res,next)
}

// Get quality Type ById
module.exports.getQualityTypeById = function(req,res,next)
{
    passport.authenticate('jwt',function(err,user)
    {
        if (err || !user) 
        {          
            return res.json({ status: 401, success: false, message: "Authentication Fail." });
        }
        else if(user){ 
            qualityModel.getQualityTypeById(req.params.quality_type_id,function(err,data){
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
          } else if (data.length == 0) {
            res.send({
              status: 200,
              success: true,
              message: "No Detail Available",
            });
          } else {
            res.send({
              status: 200,
              success: true,
              message: "Detail Found",
              data: data,
            });
          }
        }
      );
    }
  })(req, res, next);
};

//Update QualityType
module.exports.updateQualityType = function(req,res,next)
{
    passport.authenticate('jwt',function(err,user)
    {
        if (err || !user) 
        {          
            return res.json({ status: 401, success: false, message: "Authentication Fail." });
        }
        else if(user){        
        var qt = new qualityModel(req.body);                 
           
        qt.modifiedById = user[0].ad_id;
        qt.modificationDate = new Date;
        qualityModel.updateQualitytype(req.params.quality_type_id,qt,function(err, data) 
        {
            if(err){
                res.send({status:400,success:false,message:"Details Not Updated."});
            }
            else{
                res.send({status:200,success:true,message:data.message});
            }
        }); 
      
    }
  })(req, res, next);
};



// Get quality Type By Name
module.exports.getQualityByName = function(req,res,next)
{
    passport.authenticate('jwt',function(err,user)
    {
        if (err || !user) 
        {          
            return res.json({ status: 401, success: false, message: "Authentication Fail." });
        }
        else if(user){ 
            qualityModel.getQualityByName(req.params.quality_type_name,function(err,data){
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





