const pool = require("../../authorization/config");

//...................order details.......................//
exports.getpaymentdetails = (req, res) => {

    pool.query("select * from razorpay_details ",function(err,result){

        if(err) throw err;
        res.send({status:200,success:true,message:" details fetched successfully",data:result });
        console.log(result)
    })
    
   
  };
  ///////////////////////////////////////////////////////////////