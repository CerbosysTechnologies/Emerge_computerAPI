const pool = require("../../authorization/config");

var Orders = function(Orders){
    this.user_id=Orders.user_id
    this.order_id=Orders.order_id
    this.total_amount=Orders.total_amount
    this.discount=Orders.discount
    this.payable_amount=Orders.payable_amount
    this.status=Orders.status
    this.payment_type=Orders.payment_type
    this.order_date=Orders.order_date
    this.statusId = Orders.statusId
    this.createdById =Orders.createdById
    this.creationDate=Orders.creationDate
    this.modifiedById= Orders.modifiedById
    this.modificationDate =Orders.modificationDate
   }


   Orders.insertorder=(details,result)=>{
    pool.query('INSERT INTO Orders SET ?',details,(err,res)=>{
        if(err){
            console.log("eror while inserting data ");
            result(null,err)
        }
        else{
            console.log("login created successfully");
            result(null,details)
        }
    })

}


module.exports = Orders;























































// const pool = require("../../authorization/config");


// // constructor
// const Orders = function(Orders) {   
//     this.user_id = Orders.user_id;
//     this.order_id = Orders.order_id;
//     this.totalAmount = Orders.totalAmount;
//     this.payableAmount = Orders.payableAmount;
//     this.discount = Orders.discount;
//     this.status = Orders.status;
//     this.payment_type = Orders.payment_type;
//     this.order_date = Orders.order_date;
//     this.statusId = Orders.statusId;
//     this.createdById = Orders.createdById;  
//     this.creationDate = Orders.creationDate;
//     this.modifiedById = Orders.modifiedById;
//     this.modificationDate = Orders.modificationDate;
//   };

// Orders.insertorder=function(details,result)
// {

//     console.log("model checking is here ");

   
//         pool.query("INSERT INTO order SET ?", details, function (err, res) {
//             if(err){
//                             console.log("eror while inserting data ");
//                             result(null,err)
//                         }
//                         else{
//                             console.log("login created successfully");
//                             result(null,res)
//                         }
//             //     if(err) {
//             //         console.log(err);
//             //         result(err, null);
//             //     }
//             //     else{
//             //         console.log(res.insertId);    
//             //         pool.query(`select * from order where order_id=${res.insertId}`, function(err, data){
//             //             if(err){
//             //                 console.log(err);
//             //                 result(err, null);
//             //             }
//             //             else{     
//             //                 result(null, {status:200,success:true,message:"Details Saved Successfully.",id: data});
//             //             }
//             //         });
//             //     }
//             // });           
//     });
    



// }









// //    pool.query(`insert into order set ?`,details,(err,res)=>{
// // //pool.query('INSERT INTO order SET ?',details,(err,res)=>{
// //    // pool.query('INSERT INTO order SET ?', details, function (err, res) {
// //         if(err){
// //             console.log("eror while inserting data ");
// //             result(null,err)
// //         }
// //         else{
// //             console.log("login created successfully");
// //             result(null,res)
// //         }
//     // })
//     // pool.query('INSERT INTO ORDER SET user_id=?,order_id=?,totalAmount=?,discount=?,payableAmount=?,status=?,payment_type=?',[details.user_id,details.order_id,details.totalAmount,details.discount,details.payableAmount,details.status,details.payment_type],function(err,res){
// // pool.query(`insert into order user_id='${details.user_id}',order_id='${details.order_id}',totalAmount='${details.totalAmount}',payableAmount='${details.payableAmount}`,function (err,res){


//     // pool.query('INSERT INTO order SET ?', [order], function (err, res) {
//     //     if(err) {
//     //         console.log(err);
//     //         result(err, null);
//     //     }
//     //  pool.query('INSERT INTO ORDER SET user_id=?,order_id=?,totalAmount=?,discount=?,payableAmount=?,status=?,payment_type=?',[details.user_id,details.order_id,details.totalAmount,details.discount,details.payableAmount,details.status,details.payment_type],function(err,res){
//     //     else{
//     //         console.log(res.insertId);    
//     //         pool.query(`select * from order where order_id=${res.insertId}`, function(err, data){
//     //             if(err){
//     //                 console.log(err);
//     //                 result(err, null);
//     //             }
//     //             else{     
//     //                 result(null, {status:200,success:true,message:"Details Saved Successfully.",id: data});
//     //             }
//     //         });
//     // //     }
//     // });        



//     //console.log(order,"hiii")
// /*pool.query('INSERT INTO ORDER SET user_id=?,order_id=?,totalAmount=?,discount=?,payableAmount=?,status=?,payment_type=?',[details.user_id,details.order_id,details.totalAmount,details.discount,details.payableAmount,details.status,details.payment_type],function(err,res){


//     if(err)
//     result(null,err)
//     else
//     result(null,res)
// })*/
// /*pool.query(`insert into order set ?`,order,function(err,res){


//     if(err)
//     result(null,err)
//     else
//     result(null,res)
// })*/










// module.exports=Orders;