const Product = require("../Model/productModel.js");
const productModel = require("../Model/productmodel.js")

//
exports.getproductlist=(req,res)=>{
    console.log("here are the all employees list");
//    this.product_image=req.file.path;
    Product.getAllproduct((err,product)=>{
        console.log("we are here it call me again and i wroking");
        if(err)
        res.send(err)
        console.log('product',product);
        res.send(product)
    
    })
}


///
exports.productlogin=(req,res)=>{
    console.log('productmodel');
    console.log('req.body',req.body);
    var productdata= new productModel(req.body)
   
    productdata.product_image=req.file.path;
   // console.log(req.file.path);
      productdata.status_Id=1;
        productdata.creation_Date=new Date;
        productModel.createProduct(productdata,(err,productdata)=>{
            if(err){
                res.send({status:400,success:false,message:"something went wrong"})
            }
            else{
                //console.log(req.body.path);
               // console.log(req.body);
                //console.log(productdata);
                res.send({status:200,success:true,message:"image uploaded"})
            }
        })

    }


















 
//  exports.productlogin=(req,res)=>{
//     console.log('productmodel');
//     console.log('req.body',req.body);
//     var productdata= new productModel(req.body)
   
//     // productdata.image=req.file.path;
//      productdata.status_Id=1;
//         productdata.creation_Date=new Date;
//         productModel.createproduct(productdata,(err,productdata)=>{
//             if(err){
//                 res.send({status:400,success:false,message:"something went wrong"})
//             }
//             else{
//                 console.log(req.body.path);
//                 console.log(req.body);
//                 console.log(productdata);
//                 res.send({status:200,success:true,message:"image uploaded"})
//             }
//         })

//     }
