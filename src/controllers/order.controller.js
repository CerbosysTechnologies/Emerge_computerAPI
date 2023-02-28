const pool = require("../../authorization/config");
const passport=require("passport")
require("../../authorization/passport")(passport)

const Orders=require('../models/order.model.js')

module.exports.createorder=function(req,res,next)
{
    

passport.authenticate('jwt',function(err,user){
if(err||!user)
{
    console.log("User",err);
    return res.json({ status: 401, success: false, message: "Authentication Fail." });
}
else
{


var details = new Orders(req.body)

if(!details.user_id)
{
    return res.status(400).send({ error:true, message: 'No User.' });        
}
else if(!details.total_amount)
{
    return res.status(400).send({ error:true, message: 'Please Provide Total Amount.' });        
}
else if(!details.payable_amount)
{
    return res.status(400).send({ error:true, message: 'Please Provide Payable Amount.' });        
}

else if(!details.payment_type)
{
    return res.status(400).send({ error:true, message: 'Please Provide Payment Type.' });        
}
// details.user_id = user[0].user_id
console.log(details,"safjkgh79ASfhu")
 details.order_date=new Date()
 
 details.statusId=1;
 details.creationDate=new Date()
 details.modificationDate=new Date()

 Orders.insertorder(details,function(err,result){

    if(err) throw err
    console.log(result)
    res.send({ status: true, message: " Details Saved Successfully", data: details })
})


    console.log("ssss")
}



})(req,res,next)


}


