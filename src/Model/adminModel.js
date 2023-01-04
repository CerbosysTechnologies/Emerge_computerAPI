const pool = require("../../dbconnection/config");
var Admin=function(admin){
    this.a_id=admin.a_id;
    this.Name=admin.Name;
    this.email=admin.email;
    this.image=admin.image;


    this.statusId=admin.statusId;
    this.createdById=admin.createdById;
    this.creationDate=admin.creationDate;
    this.modifiedById = admin.modifiedById;
    this.modificationDate =admin.modificationDate;
    }

    // add new admin;
Admin.addAdmin=(Data,result)=>{
    pool.query('INSERT INTO admin SET ?',Data,(err,res)=>{
        if(err){
            console.log('Error while in login admin')
            result(null,err)
 }
        else{
            console.log("admin login");
            result(null,res[0]);
         }
    })
}

module.exports=Admin;