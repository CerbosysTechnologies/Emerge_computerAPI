const pool = require("../../authorization/config");
const Orderdetail = function(orderdetail) {   
    this.order_id = orderdetail.order_id;
    this.product_id = orderdetail.product_id;
    this.product_quantity = orderdetail.product_quantity;
    this.product_price = orderdetail.product_price; 
    this.offer_id = orderdetail.offer_id;
    this.rent  = orderdetail.rent;
    this.buy  = orderdetail.buy;
    this.statusId = orderdetail.statusId;
    this.createdById = orderdetail.createdById;
    this.creationDate = orderdetail.creationDate;
    this.modifiedById = orderdetail.modifiedById;
    this.modificationDate = orderdetail.modificationDate;
  };
 
//............................add to Order.........................................

Orderdetail.createOrderDetail = function (orderdetail, result) {       
    console.log(orderdetail,"here is the oreder controller check");
    pool.query("INSERT INTO order_detail SET ?", [orderdetail], function (err, res) {
            if(err) {
               // console.log(err);
                result(err, null);
            }
            else{
                //console.log(res.insertId);         
                result(null, {status:200,success:true,message:"Details Saved Successfully,",res});

            }
        });           
};

  
  //............................................







  module.exports=Orderdetail;