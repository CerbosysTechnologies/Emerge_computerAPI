const pool = require("../../dbconnection/config");
const path=require("path")

var Admin=function(admin,file){
    this.a_id=admin.a_id;
    this.Name=admin.Name;
    this.email=admin.email;
    this.image=file;
    this.statusId=admin.statusId;
    this.createdById=admin.createdById;
    this.creationDate=admin.creationDate;
    this.modifiedById = admin.modifiedById;
    this.modificationDate =admin.modificationDate;
    }

    // add new admin;
Admin.addAdmin=function(data,result){
    pool.query('INSERT INTO admin SET ?',data,function(err,res){
        if(err){
            console.log('Error while in login admin')
            result(null,err)
 }
        else{
            console.log("admin login");
            result(null,res);
         }
    })
}

module.exports=Admin;