const jwt=require('jsonwebtoken')
const passport=require('passport');

require('../../authorization/passport')(passport)
const login = require("../models/login.model.js");



exports.userLogin =(req,res)=>{

    console.log(req.body);
    var loginReqdata = new login(req.body)

     if(!loginReqdata.mobile_number){
        console.log(loginReqdata.mobile_number);
        return res.send({success:false, status:400, message:"please fill mobile number"})
    }
    else if(isNaN(loginReqdata.mobile_number))
     {
    
    return res.send({success:false, status:400, message:"Plz Enter digit value"})
      }
     
     else{
        var mobile_number =loginReqdata.mobile_number
       login.checkdetails(mobile_number,function(err,user){
            if(err) throw err
            else
            console.log(user)
            //console.log(user,"hereeeererererererrereerr");

           if(user==0)
            {
            
               loginReqdata.statusId=1;
              // loginReqdata.createdById=
               loginReqdata.creationDate=new Date()
               loginReqdata.modificationDate=new Date()
             
               
              login.createlogin(loginReqdata,(err,user)=>{
                   if (err)
                   res.send({ status: false, message: "something went wrong" });
               else
                   res.send({ status: true, message: "Login success", data: user })
               })
            }
            else
            {
//console.log("welcome =",+mobile_number);
//res.send({ status: true, message:"welcome", mobile_number });
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

//  let payload={type:"user",mobile_number:user[0].mobile_number}
//  let token=jwt.sign(payload,"emergecomputer",)
//  res.send({
//     status: 200,
//     success: true,
//     message: "Login Successful",
//     token: token,
//   });

            }

        })
       
    }

}


// module.exports.alldata=function(req,res,next)
// {

// passport.authenticate('jwt',function(err,user){

// if(err||!user)
// {
//     console.log("authenticate fail")
// }
// else
// {
//     console.log("suuu")
// }

// })(req,res,next)

// }
