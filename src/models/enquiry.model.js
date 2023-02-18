const pool = require("../../authorization/config.js");

var enquiry = function(enquiry){
    this.s_no = enquiry.s_no
    this.name = enquiry.name;
    this.mobile_number = enquiry.mobile_number;
    this.category = enquiry.category;
    this.quantity = enquiry.quantity;
    this.tenure = enquiry.tenure;
    this.statusId = enquiry.statusId;
    this.createdById = enquiry.createdById;
    this.creationDate = enquiry.creationDate
    this.modifiedById = enquiry.modifiedById;
    this.modificationDate = enquiry.modificationDate 
  }

  //create new Enqiury
enquiry.createEnquiry=(enquiryReqdata,result)=>{
    pool.query('INSERT INTO enquiry SET ?',enquiryReqdata,(err,res)=>{
        if(err){
            console.log("eror while inserting data ");
            result(null,err)
        }
        else{
            console.log("enquire created successfully");
            result(null,enquiryReqdata)
        }
    })
        
    }


// //Get All Enquiry
  enquiry.getAllEnquiry= function (result) {       
    pool.query("select * from enquiry where  order by enquiry_id desc", function (err, res) {
            if(err) {
                console.log(err);
                result(err, null);
            }
            else{                       
                result(null, res);

            }
        });           
}


    
    module.exports=enquiry;
 