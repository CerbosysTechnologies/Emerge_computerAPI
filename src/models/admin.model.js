const mysql=require("mysql");
const pool = require("../../authorization/config");

const Admin=function(admin){
    this.ad_id=admin.ad_id;
    this.email=admin.email;
    this.name=admin.name
    }

    // Admin.adminlogin=function(adminData,result){
    //     pool.query(`select * from admin where email='${adminData.email}' `,function(err,res){
    //         if(err){
    //             console.log('Error while in login admin')
    //             result(null,err)
    //  }
    //         else{
    //             console.log("email match");
    //             result(null,res);
    //          }
    //     })
    // }
    Admin.AADDMInLOgin=function(adminData,result){
        pool.query(`select * from admin limit 5` ,function(err,data){
                    if(err){
                        console.log('Error while in login admin')
                        result(null,err)
             }
                    else{
                        if(data.length>0){
                            pool.query(`select * from  admin `)
                        }
                     }
                })
            }

    

    module.exports=Admin;