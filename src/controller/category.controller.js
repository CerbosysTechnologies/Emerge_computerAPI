const categoryModel = require("../Model/Category.model.js");

exports.categorylogin=(req,res)=>{
    console.log('categorymodel');
    console.log('req.body',req.body);
    var categorydata= new categoryModel(req.body)


   
        categorydata.status_Id=1;
        categorydata.creation_Date=new Date;
        categoryModel.createcategory(categorydata,(err,categorydata)=>{
            if(err){
                res.send({status:400,success:false,message:"something went wrong"})
            }
            else{
                console.log(req.body);
                console.log(categorydata);
                res.send({status:200,success:true,message:"image uploaded"})
            }
        })

    }



// const category = require("../Model/Category.model.js");

// exports.createcategory = function(req,res){
//     const categoryReqdata= new category(req.body)
//     console.log('req.body',req.body);
//     if(!req.file){
//         res.status(400).send({ success:false, message: 'Please Provide Product Image.' });        
//     }
//     else{ 
//     // var fn = './CategoryImage' + req.file.filename; 
//     console.log("vaild data success");
//     category.createcategory(categoryReqdata,(err,category)=>{
//        if(err)
//        res.send(err);
//        res.json({status:true, message:"created", data:category})
       
//        // console.dir(req.body.task);
//    })
// }
// }
// //----

