const express = require('express');
const router = express.Router();
const razorpay = require('razorpay')

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
        res.render('checkout',{amount:order.amount,order_id:order.id})
    }
});

})


module.exports=router;

