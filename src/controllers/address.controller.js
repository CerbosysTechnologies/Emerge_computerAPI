

const register = require('../models/visitor.model.js')
const jwt=require('jsonwebtoken')
  const passport=require('passport');
  
  require('../../authorization/passport')(passport)

exports.visitorLogin =(req,res,next)=>{
  passport.authenticate("jwt",function(err,user){
    if(err||!user)
    {
      console.log("User",err);
      return res.json({ status: 401, success: false, message: "Authentication Fail." });
  }
  else{

    var visitorReqdata = new register(req.body)
    console.log(visitorReqdata,"check");
      if(!visitorReqdata.user_number){
         // console.log(visitorReqdata.user_number);
        return res.send({success:false, status:400, message:"please fill mobile number"})
     }
     else if(isNaN(visitorReqdata.user_number))
      {
     
     return res.send({success:false, status:400, message:"Plz Enter digit value in mobile number"})
       }
       else if(!visitorReqdata.address)
       {
      
      return res.send({success:false, status:400, message:"Plz Enter address"})
        }
        else if(!visitorReqdata.name)
        {
       
       return res.send({success:false, status:400, message:"Plz Enter name"})
         }
         else if(!visitorReqdata.city)
        {
       
       return res.send({success:false, status:400, message:"Plz select city"})
       }
      
    
     else{
          var user_number =visitorReqdata.user_number
         console.log(user_number,"eeee")
         register.checkdetails(user_number,function(err,result){
            if(err) 
            res.send({ status: false, message: "something went wrong" });
            else
             {
                console.log(result,"check")
 
            }
          if(result==0)
             {
          
                visitorReqdata.statusId=1;
                visitorReqdata.creationDate=new Date()
                visitorReqdata.modificationDate=new Date()
                visitorReqdata.createdById = user[0].user_id;
 
               register.createvisitor(visitorReqdata,(err,register)=>{
                    if (err)
                    res.send({ status: false, message: "something went wrong" });
                else
                    res.send({ status: true, message: "register success", data: register })
                })
             }
           else
             {
              var token="";
              var secret="";
              secret={type:"user",user_id:user[0].user_id,mobile_number:user[0].mobile_number}
              console.log(secret,"dhdhdhdhdhdhd");
              token=jwt.sign(secret,"emergecomputer");
              res.send({
                  status: 200,
                  success: true,
                  message: "Login Successful",
                  token: token,
                });
 
             }
 
        })
        
     }
    }
  })(req,res,next)
  
 


}