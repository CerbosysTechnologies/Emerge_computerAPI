const mysql=require('mysql')
const pool = require('../../authorization/config')
const Product=function(product,files){
  this.product_id=product.product_id,
  this.product_descprition=product.product_name,
  this.product_name=product.product_name,
  this.product_brand_id=product.product_brand_id,
  this.product_capacity_id=product.product_capacity_id,
  this.product_type_id=product.product_type_id,
  this.product_speed_id=product.product_speed_id,
  this.product_quality_type_id=product.product_quality_type_id,
  this.product_color_id=product.product_color_id,
  this.product_image1=files,
  this.product_image2=files,
  this.product_image3=files,
  this.product_image4=files,
  this.product_tags=product.product_tags,
  this.product_price=product.product_price,
  this.product_discount=product.product_discount,
  this.product_discount_price=product.product_discount_price,
  this.product_rent_price=product.product_rent_price,
  this.status=product.status,
  this.createdById=product.createdById,
  this.modifiedById=product.modifiedById,
  this.modificationDate=product.modificationDate
}

//Add product
Product.createProduct = function (product, result) {       
  pool.query("INSERT INTO product SET ?", product, function (err, res) {
          if(err) {
              console.log(err);
              result(err, null);
          }
          else{
              console.log(res.insertId);         
              result(null, {status:200,success:true,message:"Details Saved Successfully.", id: res.insertId});

          }
      });           
};

//Get All Products
Product.getAllProducts = function (result) {       
  pool.query(`select * from product order by product_id DESC`, function (err, res) {
          if(err) {
              console.log(err);
              result(err, null);
          }
          else{                       
              result(null, res);

          }
      });           
};



// product Acativate Deactivate Product
Product.deleteProduct = function (id,status,result) {       
  pool.query("update product SET status=? where product_id=?", 
  [status,id], function (err, res) {
          if(err) {
              console.log(err);
              result(err, null);
          }
          else{                       
              result(null, {status:200,success:true,message:"Details Updated Successfully."});

          }
      });           
};
  

// update Product
// Product.updateProductM = function(id,product,result) {
//   var update_query, value;
//   pool.query(`select * from product where product_id=${id}`,function(err, data){
//       if(err){
//           console.log(err);
//           result(err, null);
//       }
//       else{
//           console.log(data.length);
//           if(data.length>0)
//           {
//               if(product.product_image !== undefined){
//                   update_query = `update product SET product_name=?, product_descprition=?,product_brand_id=?,product_capacity_id=?,product_speed_id,product_quality_type_id=?,product_color_id=?,product_image1=?, product_image2=?,product_image3=?,product_image4=?,product_tags,product_price=?,
//                   product_discount=?, product_discount_price=?,product_rent_price=? ,
//                   modifiedById=?, 
//                   modificationDate=? where product_id=?`;

//                   value = [product.product_name, product.product_descprition,product.product_brand_id,product.product_capacity_id,product.product_speed_id,product.product_quality_type_id,product.product_color_id,product.product_image1,product.product_image2,product.product_image3,product.product_image4,product.product_tags, product.product_price, 
//                   product.product_discount, product_discount_price,product_rent_price,
//                    product.modifiedById,
//                   product.modificationDate, id];
//               }
//               else{

//                 update_query = `update product SET product_name=?, product_descprition=?,product_brand_id=?,product_capacity_id=?,product_speed_id,product_quality_type_id=?,product_color_id=?,product_image1=?, product_image2=?,product_image3=?,product_image4=?,product_tags,product_price=?,
//                 product_discount=?, product_discount_price=?,product_rent_price=? ,
//                 modifiedById=?, 
//                 modificationDate=? where product_id=?`;
                
//                 value = [product.product_name, product.product_descprition,product.product_brand_id,product.product_capacity_id,product.product_speed_id,product.product_quality_type_id,product.product_color_id,product.product_image1,product.product_image2,product.product_image3,product.product_image4,product.product_tags, product.product_price, 
//                   product.product_discount,product.product_discount_price  ,product.product_rent_price,
//                    product.modifiedById,
//                   product.modificationDate, id];
                  
//               }
//               pool.query(update_query, value, function (err, res) 
//               {
//                   if(err) 
//                   {
//                       console.log(err);
//                       result(err, null);
//                   }
//                   else
//                   {                       
//                           result(null, {status:200,success:true,message:"Details Updated Successfully."});
          
//                   }
//               });

//           }

//       }
//   });
         
// };




// // Update Image
// Product.updateProductImage = function(id,product,result) {
//   var update_query, value;

//   update_query = `update product SET product_image1=?,product_image2=?,product_image3=?,product_image4=?  where product_id=?`;

//   value = [product.product_image1,product.product_image2,product.product_image3,product.product_image4,id];

//   pool.query(update_query, value, function (err, res) 
//   {
//       if(err) 
//       {
//           console.log(err);
//           result(err, null);
//       }
//       else
//       {                       
//           result(null, {status:200,success:true,message:"Details Updated Successfully."});
//       }
//   });

// }


  module.exports=Product;
