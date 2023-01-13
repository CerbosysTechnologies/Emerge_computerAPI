const pool = require("../../dbconnection/config.js");


var Product=  function(Product,file){
    this.s_no = Product.s_no;
    this.product_id = Product.product_id;
    this.product_name = Product.product_name;
    this.product_description = Product.product_description;
    this.product_image = file;    
    this.product_type = Product.product_type;
    this.product_brand = Product.product_brand;
    this.product_capacity = Product.product_capacity;
    this.product_quality_type = Product.product_quality_type;
    this.product_colour = Product.product_colour;
    this.product_speed = Product.product_speed;
    this.product_tags = Product.product_tags;
    this.product_price = Product.product_price;
    this.product_discount = Product.product_discount;
    this.product_discount_price = Product.product_discount_price;
    this.product_rent_price = Product.product_rent_price;
    this.product_rent_per_month = Product.product_rent_per_month;
    this.createdById = Product.createdById;
    this.creation_Date = new Date();
    this.modifiedById = Product.modifiedById;
    this.modificationDate = new Date();
  }
//////
Product.getAllproduct=(result)=>{
    pool.query('SELECT * FROM product',(err,res)=>{
        if(err){
            console.log("err is occure while fetching data",err);
            result(null,err);
        }
        else{
            console.log("employee fetching sucessfully");
            result(null,res);
        }
    })
}





    
Product.createProduct = function (Product, result) {       
    pool.query("INSERT INTO Product SET ?", Product, function (err, res) {
            if(err) {
                console.log(err);
                result(null, err);
            }
            else{
                console.log(res.insertId);         
                result(null, {status:200,success:true,message:"Details Saved Successfully.", id: res.insertId});

            }
        });           
};

Product.getEmployeeById=(product_id,result)=>{
    
    pool.query('SELECT * FROM product WHERE product_id=? ', [product_id],(err,res)=>{
    if(err)
    {
        console.log('error while fetching the product by id',err);
        result(err,null)
    }
    else{
        console.log('respons ',res);
        result(null,res)
    }

    })
}


// Product.updateproduct = function (s_no, productData, result) {
//  // console.log(s_no);
//   //console.log( productData);
 
//  // console.log(productData);
//         pool.query('update product set product_name =? where s_no =? ',[productData.product_name,s_no],
//       function (err, res) {
//         if (err) {
//           console.log("Error While Updating product");
//           result(null, err);
//         } else {
//           console.log("product Updated");
//           result(null, res);
//         }
//       }
//     );
//   };
//   module.exports=Product;


Product.updateproduct =(product_id,productdata,result)=>{
console.log(product_id,productdata,"here is the check");
  pool.query('update product set product_name=?,product_description=?,product_type=?,product_brand=?,product_capacity=?,product_quality_type=?,product_colour=?,product_speed=?,product_tags=?,product_price=?,product_discount=?,product_discount_price=?,product_rent_price=?,product_rent_per_month=? where product_id=? ',[productdata.product_name,productdata.product_description,productdata.product_type,productdata.product_brand,productdata.product_capacity,productdata.product_quality_type,productdata.product_colour,productdata.product_speed,productdata.product_tags,productdata.product_price,productdata.product_discount,productdata.product_discount_price,productdata.product_rent_price,productdata.product_rent_per_month,productdata.product_id],
  // pool.query('update product SET product_name=?,product_description=?, product_image=?,product_type=?,product_brand=?,product_capacity=?,product_quality_type=?,product_colour=?,product_speed=?,product_tags=?,product_price=?,product_discount=?,product_discount_price=?,product_rent_price=?,product_rent_per_month=? where product_id = ?',[productdata.product_name,productdata.product_description,productdata.product_image,productdata.product_type,productdata.product_brand ,productdata.product_capacity,productdata.product_quality_type,productdata.product_colour,productdata.product_speed,productdata.product_tags,productdata.product_price,productdata.product_discount,productdata.product_discount_price,productdata.product_rent_price,productdata.product_rent_price,productdata.product_rent_per_month,product_id],
// pool.query('update product  SET product_name=?,product_description=?,product_type=?,product_brand=?,product_capacity=?,product_quality_type=?,product_colour=?,product_speed=?,product_tags=?,product_price=?,product_discount=?,product_discount_price=?,product_rent_price=?,product_rent_per_month=?where product_id=?',[productdata.product_name,productdata.product_description,productdata.product_image,productdata.product_type,productdata.product_brand ,productdata.product_capacity,productdata.product_quality_type,productdata.product_colour,productdata.product_speed,productdata.product_tags,productdata.product_price,productdata.product_discount,productdata.product_discount_price,productdata.product_rent_price,productdata.product_rent_per_month,productdata.product_id],
    function(err,res){
      console.log("resdfrdf",err,res);
        if(err){
            console.log('Error while updating the product');
            
            result(null, err);
        }else{
            //console.dir(req.body.task);
          //  console.log("product updated successfully");
            result(null, res);
        }

    })

}
Product.deleteproduct=(product_id, result)=>{
    pool.query(
        "delete from product where product_id=?",
        [product_id],
        function (err, res) {
          if (err) {
            console.log("error while deleting data");
            result(null, err);
          } else {
            result(null, res);
          }
        }
      );

}




 module.exports=Product;