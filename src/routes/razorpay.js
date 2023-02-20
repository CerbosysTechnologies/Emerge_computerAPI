const express = require('express');
const router = express.Router();
const razorpay = require('razorpay')
const pool=require("../../authorization/config")

const instance = new razorpay({
    key_id:'rzp_test_W7LxD3Kze0haZJ',
    key_secret:'EnRpvythAgxrW05DQvJJQMKI'
});

router.get('/',(req,res)=>{
   var options ={
    amount : 100*100,
    currency :'INR',
};
instance.orders.create(options, function(err,order){
    if(err){
        console.log(err);
    }
    else{
        console.log(order);
        //res.send(order);
        // res.send(order.id)
        pool.query('insert into razorpay_details SET id=?,entity=?,amount=?,amount_paid=?,amount_due=?,currency=?,receipt=?,offer_id=?,status=?,attempts=?,created_at=?',[order.id,order.entity,order.amount,order.amount_paid,order.amount_due,order.currency,order.receipt,order.offer_id,order.status,order.attempts,order.created_at],(function(err,res){

            if(err)
            throw err;
            console.log("suu")
        }))
        res.render('checkout',{amount:order.amount,order_id:order.id})
        console.log(order.id,"here is the amount");
    }
});

})


module.exports=router;

