const passport = require("passport");
 require("../../authorization/passport")(passport)

const Orderdetail = require("../models/orderdetails.model");
module.exports.oderdata=function(req,res,next)
{
passport.authenticate('jwt',function(err,user){
    if(err||!user)
    {
        console.log("err")
    }
    else if(user)
    {
        var data=req.body
        //console.log(data)
        var value,count;

        order = new Orderdetail(data);
        console.log(order)

        order.statusId=1;
        order.createdById = user[0].user_id
        order.creationDate = new Date;
        Orderdetail.createOrderDetail(order, function(err, data)
        {
            if(err){
        
        
                console.log(err)
                //res.send({status:400,success:false,message:"Details not saved."});
            }
            else{
                console.log(data,"asdjghajsfhjl;a");
                //count++;
                // if(count==data.length)
                // {
                     res.send({status:200,success:true,message:data.message,data:order});
                // }
            }

        });






     /* for (let key in data)
        {
//             console.log(key.length)
//             value=key.length
//           // console.log(key.length)
// //console.log(value.length);
//     // console.log(`${key}=${data[key]}`)
//      //console.log(Object.values(value));
//      console.log(`${data[key]}`)
//     //var value=`${data[key]}`
//     //console.log(value)
// var order=new OrderDetail(value)
// console.log(order)
console.log(`${data[key]}`)
value = data;
console.log(Object.values(value));
order = new Orderdetail(data);
console.log(order)
if(!order.order_id)
{
    return res.status(400).send({ error:true, message: 'No Order.' });
}
else if(!order.product_id)
{
    return res.status(400).send({ error:true, message: 'Please Provide Product' });
}

order.statusId=1;
order.createdById = user[0].email;
order.creationDate = new Date;
Orderdetail.createOrderDetail(order, function(err, data)
{
    if(err){


        console.log(err)
        //res.send({status:400,success:false,message:"Details not saved."});
    }
    else{
        console.log(data,"asdjghajsfhjl;a");
        //count++;
        // if(count==data.length)
        // {
        //     res.send({status:200,success:true,message:data.message});
        // }
    }
});
        }*/
        console.log("user")
    }
    else
    {
        console.log("plz enter token")
    }
})(req,res,next)
}



















// module.exports.insertOrderdetail = function(req,res,next)
// {
//     console.log("user is here for chechk");
//     passport.authenticate('jwt',function(err,user)
//     {
//         console.log("IS Next", user);
//         if (err || !user) 
//         {            
//             console.log("user is here for chechk");
//             console.log("User",err);
//             return res.json({ status: 401, success: false, message: "Authentication Fail." });
//         }
//         else if(user){               
//         let odData = req.body;
//         console.log(req.body,"hjjjjjjjjjjjjjjjjjj");
//         var value,order,count=0,data;
//       //for (i=0;i<=odData.length;i++)
//       for(let key in odData)
//         {
//             console.log(odData.length,"chchchchchchchchc");
//         }

//         var condition =odData.length;
//         console.log(condition,"gggggggggggggggggggggg");
//         for(i=0;i<condition;i++)
//        {
        
           
//             value = odData[i];
//             console.log(odData[i],"mmmmmmmmmmmmmmmmmmm");
//            // console.log(Object.values(value),"111111111111111111111111111111111");               
//             order = new Orderdetail (odData[i]); 
//             //console.log(order,"ppppppppppppppppppppppppppppppppppp");               
//             if(!order.order_id)
//             {
//                 return res.status(400).send({ error:true, message: 'No Order.' });        
//             }
//             else if(!order.product_id)
//             {
//                 return res.status(400).send({ error:true, message: 'Please Provide Product' });        
//             }        
//             order.statusId=1;
//             order.createdById = user[0].user_id;
//             order.creationDate = new Date;
            
//          Orderdetail.createOrderDetail (order, function(err, data) 
//             {
//                 if(err){
//                     res.send({status:400,success:false,message:"Details not saved."});
//                 }
//                 else{
//                     count++;
//                     if(count==odData.length)
//                     {
//                         res.send({status:200,success:true,message:data.message});
//                     }
//                 }
//             });
//         }    
//     }
//   })(req,res,next)
// }