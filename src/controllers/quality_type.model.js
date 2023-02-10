const passport=require('passport');
const qualityModel = require('../models/qualityType.model');
require("../../authorization/passport")(passport)






exports.insertQualityType=function(req,res,next){
    passport.authenticate('jwt',function(err,admin){
        console.log("Is Next",admin)
        if(err|| !admin){
            console.log("admin",err);
            return res.json({ status: 401, success: false, message: "Authentication Fail." });
        }
        else if(admin){
            try {
                var quality=new qualityModel(req.body);
               if(!quality.quality_type_name){
                    return res.status(400).send({ success:false, message: 'Please Provide Quality Type Name.' });        
                }
                else if(!quality.quality_type){
                    return res.status(400).send({ success:false, message: 'Please Provide Quality Type .' });        
                }

                quality.status=1;
                quality.createdById = admin[0].ad_id;
                quality.creationDate = new Date;

                qualityModel.insertQualityTypeM(quality,(err,data)=>{
                    if(err){
                        res.send({status:400,success:false,message:""});
                    }
                    else{
                        res.send({status:200,success:true,message:data.message, data:data});
                    }
                })
                
            } catch (error) {
                console.log("catch",error); 
            }
            
        }

    })(req,res,next)

}