const enquiry = require("../models/enquiry.model.js");
const passport = require("passport");
require("../../authorization/passport")(passport);

//create new enquiry
exports.createNewEnquiry =(req,res)=>{
    const enquiryReqdata= req.body
     console.log('here is the data check at controller', enquiryReqdata);
    
     if(!enquiryReqdata.name){
        return res.send({success:false, status:400, message:"please fill name "})
    }
    else  if(!enquiryReqdata.mobile_number){
        return res.send({success:false, status:400, message:"please fill number "})
    }
    else  if(!enquiryReqdata.enquire_for){
        return res.send({success:false, status:400, message:"please select product type "})
    }
    else  if(!enquiryReqdata.quantity){
        return res.send({success:false, status:400, message:"please select quantity "})
    }
    else  if(!enquiryReqdata.tenure){
        return res.send({success:false, status:400, message:"please select tenure "})
    }
     
     else{
        
        enquiryReqdata.statusId=1;
        enquiryReqdata.creationDate=new Date()
        enquiryReqdata.creationtime=new Date()
        enquiryReqdata.modificationDate=new Date()
         console.log("vaild data success");
         enquiry.createEnquiry(enquiryReqdata,(err,enquiry)=>{
             if(err)
             {
                res.send({status:400,success:false,message:" Enquiry Details can not send"});
             }
             else{
                res.json({status:true, message:"created", data:enquiry})
             }
             
             
             
         })
     }
 }

 module.exports.getAllEnquiry= function(req,res,next)
 {
     passport.authenticate('jwt',function(err,user)
     {
         if (err || !user)
         {
             return res.json({ status: 401, success: false, message: "Authentication Fail." });
         }
         else if(user){
           enquiry.getAllEnquiry(function(err,data){
                 if(err){
                     res.send({status:400,success:false,message:"No Enquiry Details Found"});
                 }
                 else if(data.length==0){
                     res.send({status:200,success:true,message:"No Enquiry Details Available"});
                 }
                 else{
                     res.send({status:200,success:true,message:
                     "Enquiry Details Found", data:data});
                 }
             });
       }
   })(req,res,next)
 }


 // Get Enquiry By Name
module.exports.getEnquiryByName = function(req,res,next)
{
    passport.authenticate('jwt',function(err,user)
    {
        if (err || !user) 
        {          
            return res.json({ status: 401, success: false, message: "Authentication Fail." });
        }
        else if(user){ 
         enquiry.getEnquiryByName(req.params.name,function(err,data){
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

 
