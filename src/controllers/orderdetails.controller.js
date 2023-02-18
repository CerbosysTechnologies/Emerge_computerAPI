const passport = require("passport");
 require("../../authorization/passport")(passport)

const Orderdetail = require("../models/orderdetails.model");

module.exports.insertOrderdetail = function(req,res,next)
{
    console.log("user is here for chechk");
    passport.authenticate('jwt',function(err,user)
    {
        console.log("IS Next", user);
        if (err || !user) 
        {            
            console.log("user is here for chechk");
            console.log("User",err);
            return res.json({ status: 401, success: false, message: "Authentication Fail." });
        }
        else if(user){               
        let odData = req.body;
        var value,order,count=0;
        for(i=0;i<odData.length;i++)
        {
            value = odData[i];
            console.log(Object.values(value));               
            order = new OrderDetail(odData[i]);                
            if(!order.order_id)
            {
                return res.status(400).send({ error:true, message: 'No Order.' });        
            }
            else if(!order.product_id)
            {
                return res.status(400).send({ error:true, message: 'Please Provide Product' });        
            }        
            order.statusId=1;
            order.createdById = user[0].user_id;
            order.creationDate = new Date;
            
         Orderdetail.createOrderDetail (order, function(err, data) 
            {
                if(err){
                    res.send({status:400,success:false,message:"Details not saved."});
                }
                else{
                    count++;
                    if(count==odData.length)
                    {
                        res.send({status:200,success:true,message:data.message});
                    }
                }
            });
        }    
    }
  })(req,res,next)
}