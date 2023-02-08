 require("../../authorization/passport")
const colorModel = require("../models/color.model")
const passport = require('passport');
require("../../authorization/passport")(passport)


exports.addColor=function(req,res,next){
    passport.authenticate('jwt',function(err,admin){
        console.log("Is Next",admin)
        if(err|| !admin){
            console.log("admin",err);
            return res.json({ status: 401, success: false, message: "Authentication Fail." });
        }
        else if(admin){
            try {
                var colordata=new colorModel(req.body);
               if(!colordata.color_name){
                    return res.status(400).send({ success:false, message: 'Please Provide Color Name.' });        
                }

                colordata.status=1;
                colordata.createdById = admin[0].ad_id;
                colordata.creation_date = new Date;

                colorModel.addColorM(colordata,(err,color)=>{
                    if(err){
                        res.send({status:400,success:false,message:data.message});
                    }
                    else{
                        res.send({status:200,success:true,message:color.message, color_id: color.color_id,data:color});
                    }
                })
                
            } catch (error) {
                console.log("catch",error); 
            }
            
        }

    })(req,res,next)

}

module.exports.getAllColor = function(req,res,next)

{
    // res.send({message:"its for testing"});
    passport.authenticate('jwt',function(err,admin)
    {
        if (err || !admin) 
        {          
            return res.json({ status: 401, success: false, message: "Authentication Fail." });
        }
        else if(admin){ 
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
  })(req,res,next)
}



module.exports.getColorById = function(req,res,next)
{
    passport.authenticate('jwt',function(err,admin)
    {
        if (err || !admin) 
        {          
            return res.json({ status: 401, success: false, message: "Authentication Fail." });
        }
        else if(admin){ 
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
  })(req,res,next)
};



module.exports.updateColor = function(req,res,next)
{
    passport.authenticate('jwt',function(err,admin)
    {
        if (err || !admin) 
        {          
            return res.json({ status: 401, success: false, message: "Authentication Fail." });
        }
        else if(admin){        
        var colordata = new colorModel(req.body);                 
       if(!colordata.color_name)
        {
            return res.status(400).send({ error:true, message: 'Please Provide Color Name.' });        
        }        
        colordata.modifiedById = admin[0].id;
        colordata.modificationDate = new Date;
        colorModel.updateColorM(req.params.color_id,colordata,function(err, data) 
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
          
