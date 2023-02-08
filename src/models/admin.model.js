const mysql=require("mysql");
const pool = require("../../authorization/config");

const Admin=function(admin){
    this.ad_id=admin.ad_id;
    this.email=admin.email;
    this.name=admin.name
    }

    Admin.adminloginm=function(adminData,result){
        pool.query(`select * from admin where email='${adminData.email}' `,function(err,res){
            if(err){
                console.log('Error while in login admin')
                result(null,err)
     }
            else{
                console.log("email match");
                result(null,res);
             }
        })
    }
            

    

    module.exports=Admin;