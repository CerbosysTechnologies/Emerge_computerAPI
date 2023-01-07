const adminmodel = require("../model/admin.model");
const jwt=require('jsonwebtoken')
const path=require('path')

exports.adminLoginM=function(req,res){
    console.log('adminlogin');
    console.log('req.body',req.body);
    // var admin_data = new AdminModel(req.body)
    // var path=req.file.path;
    // var file=req.file;
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
    adminmodel.adminlogin(admin_data,function(err,admindata){
        if(err){
            res.send({status:400, success:false, message:"Something Went Wrong"})
        }
        else{
            console.log(req.file.path)

        
            
            const jwttoken=jwt.sign({adminModel:adminmodel.email},"emergecomputer")
            res.send({status:200, success:true, message:"Login Successful",data:admindata,token:jwttoken})
                }
    })
}
}

