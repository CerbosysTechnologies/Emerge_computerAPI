const mysql=require('mysql')
const pool = require("../../authorization/config");

//Constructor
const ProductType = function(producttype, file) {     
    this.product_type_id = producttype.product_type_id;
    this.product_type_name = producttype.product_type_name;
    this.product_type_image = file;
    this.statusId = producttype.statusId;
    this.creationDate = producttype.creationDate;  
    this.createdById = producttype.createdById;
    this.modifiedById = producttype.modifiedById;
    this.modificationDate = producttype.modificationDate;
  };  


  //Add Product Type
  ProductType.addProductType = function (productType, result) {       
    pool.query(`select product_type_name from product_type where product_type_name ='${productType.product_type_name}'`, function (err, res) {
            if(err) {
                console.log(err);
            }
            else{
                try {
                    if(res.length!=0){
                        result(err,{status:400,success:false,message:"Product Name is Already Saved."}) 
                    }
                    else{
                        pool.query("INSERT INTO product_type SET ?", productType, function (err, res) {
                            if(err) {
                                result(err, null);
                            }                
                            else{                               
                                result(null, {status:200,success:true,message:"Details Saved Successfully."});
                            }
                            });
                    }
                    
                } catch (e) {
                    console.log(e)
                }
            }
        });           
};






  //Get All Product Type
ProductType.getAllProductTypeM = function (result) {       
    pool.query(`select * from product_type Where statusId=1 order by product_type_id desc `, function (err, res) {
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
    pool.query(`select * from product_type Where statusId=1 and product_type_id=?`,[product_type_id], function (err, res) {
            if(err) {
                console.log(err);
                result(err, null);
            }
            else{                       
                result(null, res);

            }
        });           
};



//Get ProductType By Name
ProductType.getProductTypeByName = function (product_type_name, result) {       
    pool.query(`select * from product_type Where statusId=1 and product_type_name=?`,[product_type_name], function (err, res) {
            if(err) {
                console.log(err);
                result(err, null);
            }
            else{                       
                result(null, res);

            }
        });           
};



//update Product_type

// ProductType.updateProductType = function(id,pt,result) {
//     var update_query, value;
//     pool.query(`select * from product_type where product_type_id=${id}`,function(err, data){
//         if(err){
//             console.log(err);
//             result(err, null);
//         }
//         else{
//             console.log(data.length);
//             if(data.length>0)
//             {
//                 if(pt.image !== undefined){
//                     update_query = `update product_type SET product_type_name=?, image=?, modifiedById=?, 
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


ProductType.updateProductType= function (id,pt,result) {       
    pool.query(`select product_type_name from product_type where product_type_name ='${pt.product_type_name}'`, function (err, res) {
            if(err) {
                console.log(err);
            }
            else{
                try {
                    if(res.length!=0){
                        result(err,{status:400,success:false,message:"ProductType is Already Saved."}) 
                    }
                    else{
                        var update_query, value;
                        pool.query(`select * from product_type where product_type_id=${id}`,function(err, data){
                            if(err){
                                console.log(err);
                                result(err, null);
                            }
                            else{
                                console.log(data.length);
                                if(data.length>0)
                                {
                                    if(pt.product_type_image !== undefined){
                                        update_query = `update product_type SET product_type_name=?, product_type_image=?, modifiedById=?, 
                                        modificationDate=? where product_type_id=?`;
                    
                                        value = [pt.product_type_name, pt.product_type_image,pt.modifiedById, pt.modificationDate, id];
                                    }
                                    else{
                                        update_query = `update product_type SET product_type_name=?, modifiedById=?, 
                                        modificationDate=? where product_type_id=?`;
                    
                                        value = [pt.product_type_name,pt.modifiedById, pt.modificationDate, id];
                                    }
                                    pool.query(update_query, value, function (err, res) 
                                    {
                                        if(err) 
                                        {
                                            console.log(err);
                                            result(err, null);
                                        }
                                        else
                                        {                       
                                                result(null, {status:200,success:true,message:"Details Updated Successfully."});
                                
                                        }
                                    });
                    
                                }
                    
                            }
                        });
                    }
                    
                } catch (e) {
                    console.log(e)
                }
            }
        });           
}






  module.exports=ProductType;



