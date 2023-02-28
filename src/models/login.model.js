const pool = require("../../authorization/config");

var login = function(login){
 this.user_id=login.user_id
 this.mobile_number=login.mobile_number
 this.statusId = login.statusId
 this.creationDate=login.creationDate
 this.modificationDate =login.modificationDate
}
login.createlogin=(loginReqdata,result)=>{
    pool.query('INSERT INTO user SET ?',loginReqdata,(err,res)=>{
        if(err){
            console.log("eror while inserting data ");
            result(null,err)
        }
        else{
            console.log("login created successfully");
            result(null,loginReqdata)
        }
    })

}
login.checkdetails=function(mobile_number,result)
{
    pool.query("select * from user where mobile_number=?",mobile_number,function(err,res){
        if(err)
        
        result(null,err)
        else
        result(null,res)
    })
}


module.exports=login;