const pool = require("../../authorization/config");
const passport = require("passport");
require("../../authorization/passport")(passport)
const jwt = require("jsonwebtoken")


exports.getmoniter=function(req,res,next){
     passport.authenticate('jwt',function(err,user){
          if (err||!user)
          {
            console.log("user",user);
            return res.json({status:401, success:false, message: 'authentication fail'})
          }
          else {
    pool.query("select * from product where product_name='moniter'",function(err,result){
            if(err){
                console.log("eror while searching this product ");
                res.send({status:400,success:false,message:"No Detail Found"});
            }
            else{
                console.log("search get successfully");
                res.send({status:200,success:true,message:"Detail Found", data:result});
            }

            })
             }
           })(req,res,next)
    }



//////////.......

exports.getlaptop=function(req,res,next){
    passport.authenticate('jwt',function(err,user){
         if (err||!user)
         {
           console.log("user",user);
           return res.json({status:401, success:false, message: 'authentication fail'})
         }
         else {
   pool.query("select * from product where product_name='laptop'",function(err,result){
           if(err){
               console.log("eror while searching this product ");
               res.send({status:400,success:false,message:"No Detail Found"});
           }
           else{
               console.log("search get successfully");
               res.send({status:200,success:true,message:"Detail Found", data:result});
           }

           })
            }
          })(req,res,next)
   }

   exports.getmouse=function(req,res,next){
    passport.authenticate('jwt',function(err,user){
         if (err||!user)
         {
           console.log("user",user);
           return res.json({status:401, success:false, message: 'authentication fail'})
         }
         else {
   pool.query("select * from product where product_name='mouse'",function(err,result){
           if(err){
               console.log("eror while searching this product ");
               res.send({status:400,success:false,message:"No Detail Found"});
           }
           else{
               console.log("search get successfully");
               res.send({status:200,success:true,message:"Detail Found", data:result});
           }

           })
            }
          })(req,res,next)
   }


   exports.getkeyboard=function(req,res,next){
    passport.authenticate('jwt',function(err,user){
         if (err||!user)
         {
           console.log("user",user);
           return res.json({status:401, success:false, message: 'authentication fail'})
         }
         else {
   pool.query("select * from product where product_name='keyboard'",function(err,result){
           if(err){
               console.log("eror while searching this product ");
               res.send({status:400,success:false,message:"No Detail Found"});
           }
           else{
               console.log("search get successfully");
               res.send({status:200,success:true,message:"Detail Found", data:result});
           }

           })
            }
          })(req,res,next)
   }
   exports.getcpu=function(req,res,next){
    passport.authenticate('jwt',function(err,user){
         if (err||!user)
         {
           console.log("user",user);
           return res.json({status:401, success:false, message: 'authentication fail'})
         }
         else {
   pool.query("select * from product where product_name='cpu'",function(err,result){
           if(err){
               console.log("eror while searching this product ");
               res.send({status:400,success:false,message:"No Detail Found"});
           }
           else{
               console.log("search get successfully");
               res.send({status:200,success:true,message:"Detail Found", data:result});
           }

           })
            }
          })(req,res,next)
   }
   exports.getgamingcpu=function(req,res,next){
    passport.authenticate('jwt',function(err,user){
         if (err||!user)
         {
           console.log("user",user);
           return res.json({status:401, success:false, message: 'authentication fail'})
         }
         else {
   pool.query("select * from product where product_name='gamingcpu'",function(err,result){
           if(err){
               console.log("eror while searching this product ");
               res.send({status:400,success:false,message:"No Detail Found"});
           }
           else{
               console.log("search get successfully");
               res.send({status:200,success:true,message:"Detail Found", data:result});
           }

           })
            }
          })(req,res,next)
   }
   
   exports.getHarddisk=function(req,res,next){
    passport.authenticate('jwt',function(err,user){
         if (err||!user)
         {
           console.log("user",user);
           return res.json({status:401, success:false, message: 'authentication fail'})
         }
         else {
   pool.query("select * from product where product_name='Harddisk'",function(err,result){
           if(err){
               console.log("eror while searching this product ");
               res.send({status:400,success:false,message:"No Detail Found"});
           }
           else{
               console.log("search get successfully");
               res.send({status:200,success:true,message:"Detail Found", data:result});
           }

           })
            }
          })(req,res,next)
   }
   exports.getcomputer=function(req,res,next){
    passport.authenticate('jwt',function(err,user){
         if (err||!user)
         {
           console.log("user",user);
           return res.json({status:401, success:false, message: 'authentication fail'})
         }
         else {
   pool.query("select * from product where product_name='computer'",function(err,result){
           if(err){
               console.log("eror while searching this product ");
               res.send({status:400,success:false,message:"No Detail Found"});
           }
           else{
               console.log("search get successfully");
               res.send({status:200,success:true,message:"Detail Found", data:result});
           }

           })
            }
          })(req,res,next)
   }
   
   






