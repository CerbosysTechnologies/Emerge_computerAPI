const AdminModel = require("../model/adminModel");
const jwt=require('jsonwebtoken')
const path=require('path')

exports.adminLoginM=function(req,res){
    console.log('adminlogin');
    console.log('req.body',req.body);
    // var admin_data = new AdminModel(req.body)
    // var path=req.file.path;
    var file=req.file;
    let admin_data={
        a_id:req.body.a_id,
        Name:req.body.Name,
        email:req.body.email,
        image:req.file.path,
        statusId:req.body.statusId,
        createdById:req.body.createdById,
        creationDate:req.body.creationDate,
        modifiedById:req.body.modifiedById,
        modificationDate:req.body.modificationDate
    }
if(!admin_data.email){
    return res.send({success:false, statusbar:400, message:"Email Not Found"})
}
else if(!admin_data.Name){
    return res.send({success:false, statusbar:400, message:"Name Not Found"})

}
else{
    admin_data.image=req.file.path;
    admin_data.statusId=1;
    admin_data.creationDate= new Date;
    // admin_data.image=req.body.path;
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

