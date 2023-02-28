
const Wishlist = require("../models/wishlist.model")
const jwt=require('jsonwebtoken')
const passport=require('passport')
require('../../authorization/passport')(passport)


exports.createWishlist = function(req,res,next)
{
    passport.authenticate('jwt',function(err,user)
    {
        console.log("IS Next", user);
        if (err || !user) 
        {            
            console.log("User","user cheking");
            return res.json({ status: 401, success: false, message: "Authentication Fail." });
        }
        else if(user){                       
            var wishlist = new Wishlist(req.body);    
            
            console.log(wishlist,"check wishlist");
            if(!wishlist.product_id)
            {
                return res.status(400).send({ error:true, message: 'Please Provide Product' });        
            }
            
            wishlist.statusId=1;
            wishlist.createdById = user[0].user_id;
            wishlist.user_id = user[0].user_id;
            wishlist.creationDate = new Date;
            Wishlist.addWishlist(wishlist, function(err, data) 
            {
                if(err){
                    res.send({status:400,success:false,message:"Details not saved."});
                }
                else{                    
                        res.send({status:200,success:true,message:"data saved scessfully",data:wishlist});
                }
            });
    }
  })(req,res,next)
}

exports.deleteWishlist = function(req,res,next)
{
    passport.authenticate('jwt',function(err,user)
    {
        if (err || !user) 
        {          
            return res.json({ status: 401, success: false, message: "Authentication Fail." });
        }
        else if(user){ 
            var id = req.body.wishlist_id                         
        Wishlist.deleteWishlist(id,function(err, data) 
        {
            if(err){
                res.send({status:400,success:false,message:"Details not saved."});
            }           
            else{
                res.send({status:200,success:true,message:data.message});
            }
        });
    }
    
  })(req,res,next)
}

