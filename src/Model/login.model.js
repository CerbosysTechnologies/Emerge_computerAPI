// const dbcon = require("../../config/dbconfig.js");
const pool = require("../../dbconnection/config.js");

var login = function(login){
    this.s_no = login.s_no;
    this.mobile_number = login.mobile_number;
    this.statusId = login.statusId;
    this.createdById = login.createdById;
    this.creationDate = new Date();
    this.modifiedById = login.modifiedById;
    this.modificationDate = new Date();
  }
  login.createlogin=(loginReqdata,result)=>{
    pool.query('INSERT INTO login SET ?',loginReqdata,(err,res)=>{
        if(err){
            console.log("eror while inserting data ");
            result(null,err)
        }
        else{
            console.log("login created successfully");
            result(null,res)
        }
    })
        
    }


  module.exports=login;