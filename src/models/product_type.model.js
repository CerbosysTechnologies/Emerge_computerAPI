const mysql=require('mysql')
const pool = require("../../authorization/config");

//Constructor
const ProductType = function(producttype, file) {     
    this.product_type_id = producttype.product_type_id;
    this.product_type_name = producttype.product_type_name;
    this.image = file;
    this.status = producttype.status;
    this.creationDate = producttype.creationDate;  
    this.createdById = producttype.createdById;
    this.modifiedById = producttype.modifiedById;
    this.modificationDate = producttype.modificationDate;
  };  


  //Add Product Type
  ProductType.addProductTypeM=function(product_type,result){
    pool.query("INSERT INTO product_type SET ?",product_type,function(err,res){
        if(err) {
            console.log(err);
            result(err, null);
        }
        else{
            console.log(res.insertId);         
            result(null, {status:200,success:true,message:"Details Saved Successfully."});

        }
    })
  }


  //Get All Product Type
ProductType.getAllProductTypeM = function (result) {       
    pool.query(`select * from product_type Where status=1 `, function (err, res) {
            if(err) {
                console.log(err);
                result(err, null);
            }
            else{                       
                result(null, res);

            }
        });           
};

//Get ProductType By Id
ProductType.getProductTypeByIdM = function (product_type_id, result) {       
    pool.query(`select * from product_type Where status=1 and product_type_id=?`,[product_type_id], function (err, res) {
            if(err) {
                console.log(err);
                result(err, null);
            }
            else{                       
                result(null, res);

            }
        });           
};





// //Update ProductType

// ProductType.updateProductTypeM = function(id,pt,result) {
//     var update_query, value;
//     pool.query(`select * from product_type where product_type_id=${id}`,function(err, data){
//         if(err){
//             console.log(err);
//             result(err, null);
//         }
//         else{
        
//             if(data.length>0)
//             {
//                 if(pt.image !== undefined){
//                     update_query = `update product_type SET product_type_name
//                     =?, image=?, modifiedById=?, 
//                     modificationDate=? where product_type_id=?`;

//                     value = [pt.product_type_name, pt.image,pt.modifiedById, pt.modificationDate, id];
//                 }
//                 else{
//                     update_query = `update product_type SET product_type_name=?, modifiedById=?, 
//                     modificationDate=? where product_type_id=?`;

//                     value = [pt.product_type_name,pt.modifiedById, pt.modificationDate, id];
//                 }
//                 pool.query(update_query, value, function (err, res) 
//                 {
//                     if(err) 
//                     {
//                         console.log(err);
//                         result(err, null);
//                     }
//                     else
//                     {                       
//                             result(null, {status:200,success:true,message:"Details Updated Successfully."});
            
//                     }
//                 });

//             }

//         }
//     });
           
// };






  module.exports=ProductType;



