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

    enquiry.getAllenquiry=(result)=>{
        pool.query('SELECT * FROM enquiry',(err,res)=>{
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


    
    module.exports=enquiry;
 