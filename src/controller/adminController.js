const AdminModel = require("../model/adminModel");
const jwt=require('jsonwebtoken')

exports.adminLoginM=function(req,res){
    console.log('adminlogin');
    console.log('req.body',req.body);
    var admin_data = new AdminModel(req.body)
    var pathdata=req.file.path;
if(!admin_data.email){
    return res.send({success:false, statusbar:400, message:"Email Not Found"})
}
else if(!admin_data.Name){
    return res.send({success:false, statusbar:400, message:"Name Not Found"})

}
else{
    admin_data.statusId=1;
    admin_data.creationDate= new Date;
    AdminModel.addAdmin(admin_data,function(err,Admindata){
        if(err){
            res.send({status:400, success:false, message:"Something went wrong"})
        }
        else{
            console.log(req.file.path)

        
            
            const jwttoken=jwt.sign({AdminModel:AdminModel.email},"12345")
            res.send({status:200, success:true, message:"Login Successful",data:Admindata,token:jwttoken})
                }
    })
}
}

