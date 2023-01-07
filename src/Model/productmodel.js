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



module.exports=Product;