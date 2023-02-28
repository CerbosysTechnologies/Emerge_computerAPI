const pool = require("../../authorization/config");


var register = function(register){
   this.visitor_id=register.visitor_id
    this.name=register.name
    this.user_number=register.user_number
    this.pincode=register.pincode
    this.Locality=register.Locality
    this.address=register.address
    this.city=register.city
    this.Landmark=register.Landmark
    this.address_type=register.address_type
    this.statusId = register.statusId
    this.createdById =register.createdById
    this.creationDate=register.creationDate
    this.modifiedById= register.modifiedById
    this.modificationDate =register.modificationDate
   }

   register.createvisitor=(visitorReqdata,result)=>{
    pool.query('INSERT INTO address SET ?',visitorReqdata,(err,res)=>{
        if(err){
            console.log("eror while inserting data ");
            result(null,err)
        }
        else{
            console.log("visitor created successfully");
            result(null,visitorReqdata)
        }
    })

}
register.checkdetails=function(user_number,result)
{
    pool.query("select * from address where user_number=?",user_number,function(err,res){
        if(err)
        result(null,err)
        else
        result(null,res)
    })
}

module.exports= register;