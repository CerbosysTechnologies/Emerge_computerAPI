// const login = require("../models/login.model.js");
// const loginModel=require("../Model/login.model.js")

const login = require("../Model/login.model.js");

exports.createNewlogin =(req,res)=>{
    const loginReqdata= new login(req.body)
     console.log('req.body',req.body);
     //check null 
//      if(req.body.constuctor===Object && Object.keys(req.body).length ===0)
//      {
//          res.send(400).send({success:false,message:"please fill fields"});
//      }
//      else{
//          console.log("vaild data success");
//          login.createlogin(loginReqdata,(err,login)=>{
//              if(err){
//              res.send(err)
//              res.json({status:false, message:"something went wrong", data:login})
             
             
//              }
//          })
//      }
//  }

 if (req.body.constuctor === Object && Object.keys(req.body).length === 0) {
    res.send(400).send({ status: false, message: "please fill number" });
}
else {
    console.log("vaild data success");
    login.createlogin(loginReqdata, (err, login) => {
        if (err)
            res.send({ status: false, message: "something went wrong" });
        else
            res.send({ status: true, message: "Login success", data: login })
    })
}
}