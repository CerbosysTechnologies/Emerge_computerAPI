const pool = require("../../authorization/config");

const passport=require("passport")
require("../../authorization/passport")(passport)
const ShoppingCart=require("../models/shopingcart.model")

module.exports.addcart=function(req,res,next)
{

passport.authenticate('jwt',function(err,user){

if(err||!user)
{

    console.log("User",err);
            return res.json({ status: 401, success: false, message: "Authentication Fail." });
}
else if(user)
{
        var cart = new ShoppingCart(req.body);
       
        var image=req.files
        console.log(image)
        var name=image[0].filename
        console.log(name)
        console.log('Cart', cart);
        if(!cart.product_name){
                res.status(400).send({ success:false, message: 'Please Provide Product Name.' });        
        }else{
        // cart.user = user[0].email;
        // cart.user_id = 0;
       cart.statusId=1;
       // cart.createdById = user[0].email;
        // cart.statusId=1;
         cart.creationDate=new Date()
        // cart.modificationDate=new Date()
         cart.createdById = user[0].user_id;
        // // console.log(createdById);
        // // console.log(creationDate);

        console.log(cart,"jjjjjjjjjjjjjjjjjj");
        ShoppingCart.createShoppingCart(cart,name,function(err,data) 
            {
                if(err){
                    res.send({status:400,success:false,message:data});
                }
                else{
                    
                    
                    console.log(data)
                    res.send({status:200,success:true,message:data.message,data:cart});
                }
            });
        
    
   

        }

    console.log("user")
}


})(req,res,next)

}
exports.clearcart = function(req,res,next){
    passport.authenticate('jwt',function(err,user)
    {
        if (err || !user) 
        {          
            return res.json({ status: 401, success: false, message: "Authentication Fail." });
        }
        else if(user){ 
            var id=req.body.user_id 
            console.log(id)      
        pool.query(`delete from shopping_cart where user_id=?`,id,function(err, data) 
        {
            if(err){
                res.send({status:400,success:false,message:"Details not Deleted." + err});
            }
            else{
                res.send({status:200,success:true,message:"Cart Cleared."});
            }
        });
      
    }
})(req,res,next);

};
exports.totalcartitem =function(req,res,next){

    passport.authenticate('jwt', function(err, user){
        if (err || !user) 
        {          
            return res.json({ status: 401, success: false, message: "Authentication Fail." });
        }
        else if(user){
         
           
            pool.query(`SELECT count(*) as count FROM shopping_cart `, function(err, data){
                console.log(data,"data is here  to check ");
                if(err){
                   
                    
                    res.send({status:400,success:false,message:"No Detail Found"});
                }
                else if(data.length == 0){
                    res.send({status:200,success:true,message:"No Detail Available"});
                }
                else{
                    
                    res.send({status:200,success:true,message:"Detail Found", data:data});
                }
            })
        }
    })(req,res,next)
    
    }

  exports.gettotalqantity =function (req,res,next){
   
    passport.authenticate('jwt', function(err, user){
        if (err || !user) 
        {          
            return res.json({ status: 401, success: false, message: "Authentication Fail." });
        }
        else if(user){
            var id=req.body.user_id
            pool.query(`SELECT sum(product_quantity) as quantity FROM shopping_cart where user_id=?`,id, function(err, data){
                if(err){
                    res.send({status:400,success:false,message:"No Detail Found"});
                }
                else if(data.length == 0){
                    res.send({status:200,success:true,message:"No Detail Available"});
                }
                else{
                    res.send({status:200,success:true,message:"Detail Found", data:data});
                }
            })
        }
    })(req,res,next)

  }
    
  module.exports.UserCartItems = function(req, res, next){
    passport.authenticate('jwt', function(err, user){
        if (err || !user) 
        {          
            return res.json({ status: 401, success: false, message: "Authentication Fail." });
        }
        else if(user){
            var id = req.body.user_id
            ShoppingCart.AllCartItems(id, function(err, data){
                if(err){
                    res.send({status:400,success:false,message:"No Detail Found"});
                }
                else if(data.length == 0){
                    res.send({status:200,success:true,message:"No Detail Available"});
                }
                else{
                    res.send({status:200,success:true,message:"Detail Found", data:data});
                }
            })
        }
    })(req,res,next)
}
