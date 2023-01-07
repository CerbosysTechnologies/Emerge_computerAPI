const pool = require("../../dbconnection/config.js");


// const pool = require("../../dbconnection/config.js");
var category = function(category,images){
    this.s_no = category.s_no;
    this.category_id = category.category_id;
    this.category_type = category.category_type;
    this.image = category.image;
    // this.image = images;
    this.status = category.status;
    this.status_Id = category.status_Id;
    this.createdById = category.createdById;
    this.creation_Date = new Date();
    this.modifiedById = category.modifiedById;
    this.modificationDate = new Date();
  }
/////
category.getAllcategory=(result)=>{
    pool.query('SELECT * FROM category',(err,res)=>{
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
///////////////
  console.log();
  
category.createcategory = function (category, result) {       
    pool.query("INSERT INTO category SET ?", category, function (err, res) {
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

  module.exports=category;