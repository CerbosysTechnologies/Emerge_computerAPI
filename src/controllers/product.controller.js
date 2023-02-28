// const passport=require('passport');
// const productModel = require('../models/product.model');
// const jimp=require('jimp')


// require("../../authorization/passport")(passport)



// // GetAll Products
// module.exports.getAllProducts = function(req,res,next)
// {
//     passport.authenticate('jwt',function(err,user)
//      {
//       if (err || !user) 
//         {          
//             return res.json({ status: 401, success: false, message: "Authentication Fail." });
//          }
//      else if(user){ 
//             productModel.getAllProducts(function(err,data){
//                 if(err){
//                     res.send({status:400,success:false,message:"No Detail Found"});
//                 }
//                 else if(data.length==0){
//                     res.send({status:200,success:true,message:"No Detail Available"});
//                 } 
//                 else{
//                     res.send({status:200,success:true,message:
//                     "Detail Found", data:data});
//                 }
//             });
//       }
//  })(req,res,next)
// }


// // product Acativate Deactivate 
// module.exports.activateDeactivateProduct = function(req,res,next)
// {
//     passport.authenticate('jwt',function(err,user)
//     {
//         if (err || !user) 
//         {          
//             return res.json({ status: 401, success: false, message: "Authentication Fail." });
//         }
//         else if(user){ 
        
//         var status = req.params.status;           
//         productModel.deleteProduct(req.params.product_id,statusId,function(err, data) 
//         {
//             if(err){
//                 res.send({status:400,success:false,message:"Status not saved."});
//             }           
//             else{
//                 res.send({status:200,success:true,message:data.message});
//             }
//         }); 
      
//     }
//   })(req,res,next)
// }






// // Update ProductImage
// module.exports.updateProductImage = function(req,res)
// {
//     try
//     {    
       
//         if(!req.files.product_image1){
//             return res.status(400).send({ success:false, message: 'Please Provide  Product Image 1.' });        
//         }

//        else if(!req.files.product_image2){
//             return res.status(400).send({ success:false, message: 'Please Provide  Product Image 2.' });        
//         }

//         else if(!req.files.product_image3){
//             return res.status(400).send({ success:false, message: 'Please Provide Product Image 3.' });        
//         }

//         else if(!req.files.product_image4){
//             return res.status(400).send({ success:false, message: 'Please Provide Product Image 4.' });        
//         }
    
    
      
//         var file1 = (typeof req.files.product_image1 ||req.files.product_image2||req.files.product_image3||req.files.product_image4 !== "undefined") ? req.files.product_image1[0].filename : '';
//         console.log('filename1 ',file1 == '');
//         if(file1 == ''){
//            return res.status(400).send({ success:false, message: 'Please Provide product Image1.' }); 
//         }
//         else{
//             file1 = './public/product/' + req.files.product_image1[0].filename;
//             jimp.read(file1, function (err, img) {
//             if (err) 
//             throw err;
//             img.resize(250, 250)            // resize
//             .quality(100)              // set JPEG quality       
//             .write('./public/product/' + file1) // save
//             file1 = './public/product/' + file1;
//             console.log('Resized !!', file1);              
//         });
    
//         }
    
//         var file2 = (typeof req.files.product_image2 !== "undefined") ? req.files.product_image2[0].filename : '';
//         console.log('filename2 ',file2 == '');
//         if(file2 == ''){
//             // res.status(400).send({ success:false, message: 'Please Provide Prescription Image.' }); 
//             // file2='';
//         }
//         else{
//             file2 = './public/product/' + req.files.product_image2[0].filename;
//             jimp.read(file2, function (err, img) {
//             if (err) 
//             throw err;
//             img.resize(250, 250)            // resize
//             .quality(100)              // set JPEG quality       
//             .write('./public/product/' + file2) // save
//             console.log('Resized !!',file2)              
//         });
    
//         }
    
//         var file3 = (typeof req.files.product_image3 !== "undefined") ? req.files.product_image3[0].filename : '';
//         console.log('filename3 ',file3 == '');
//         if(file3 == ''){
//             // res.status(400).send({ success:false, message: 'Please Provide Prescription Image.' }); 
//             // file3='';
//         }
//         else{
//             file3 = './public/product/' + req.files.product_image3[0].filename;
//             jimp.read(file3, function (err, img) {
//             if (err) 
//             throw err;
//             img.resize(250, 250)            // resize
//             .quality(100)              // set JPEG quality       
//             .write('./public/product/' + file3) // save
//             console.log('Resized !!',file3)              
//         });
    
//         }
    
//         var file4 = (typeof req.files.product_image4 !== "undefined") ? req.files.product_image4[0].filename : '';
//         console.log('filename4 ',file4 == '');
//         if(file4 == ''){
//             // res.status(400).send({ success:false, message: 'Please Provide Prescription Image.' }); 
//             // file4 = '';
//         }
//         else{
//             file4 = './public/product/' + req.files.product_image4[0].filename;
//             jimp.read( file4, function (err, img) {
//             if (err) 
//             throw err;
//             img.resize(250, 250)            // resize
//             .quality(100)              // set JPEG quality       
//             .write('./public/product/' + file4) // save
//             console.log('Resized !!',file4)              
//         });
    
//         }
            
//             var product = new productModel(req.body,file1); 
//             product.modifiedById=1
//             product.modificationDate=new Date;
         

//             productModel.updateProductImageM(req.params.product_id,product, function(err, data) 
//             {
//                 if(err){
//                         res.send({status:400,success:false,message:"Details not saved."});
//                 }
//                 else{
//                         res.send({status:200,success:true,message:data.message});
//                     }
//             });
        
//         }catch(e){ console.log("catch",e);   }  
// }







// module.exports.getCountProducts = function(req,res,next)
// {
//     // passport.authenticate('jwt',function(err,user)
//     // {
//     //     if (err || !user) 
//     //     {          
//     //         return res.json({ status: 401, success: false, message: "Authentication Fail." });
//     //     }
//     //     else if(user){ 
//             productModel.getProductsCount(function(err,data){
//                 if(err){
//                     res.send({status:400,success:false,message:"No Detail Found"});
//                 }
//                 else if(data.length==0){
//                     res.send({status:200,success:true,message:"No Detail Available"});
//                 } 
//                 else{
//                     res.send({status:200,success:true,message:
//                     "Detail Found", data:data});
//                 }
//             });
//       // }
//   //})(req,res,next)
// }



// //get All Product
// module.exports.getProductById = function(req,res,next)
// {
//     // passport.authenticate('jwt',function(err,user)
//     // {
//     //     if (err || !user) 
//     //     {          
//     //         return res.json({ status: 401, success: false, message: "Authentication Fail." });
//     //     }
//     //     else if(user){ 
//             productModel.getProductById(req.params.product_id,function(err,data){
//                 if(err){
//                     res.send({status:400,success:false,message:"No Detail Found"});
//                 }
//                 else if(data.length==0){
//                     res.send({status:200,success:true,message:"No Detail Available"});
//                 } 
//                 else{
//                     res.send({status:200,success:true,message:
//                     "Detail Found", data:data});
//                 }
//             });
//       // }
//  // })(req,res,next)
// }


    

// //get All Product
// module.exports.getProductNa = function(req,res,next)
// {
//     // passport.authenticate('jwt',function(err,user)
//     // {
//     //     if (err || !user) 
//     //     {          
//     //         return res.json({ status: 401, success: false, message: "Authentication Fail." });
//     //     }
//     //     else if(user){ 
//             productModel.getProductName(req.params.product_descprition,function(err,data){
//                 if(err){
//                     res.send({status:400,success:false,message:"No Detail Found"});
//                 }
//                 else if(data.length==0){
//                     res.send({status:200,success:true,message:"No Detail Available"});
//                 } 
//                 else{
//                     res.send({status:200,success:true,message:
//                     "Detail Found", data:data});
//                 }
//             });
//       // }
//  // })(req,res,next)
// }

        









// module.exports.insertProduct = function(req,res,next){
//     passport.authenticate('jwt',function(err,user)
//     {
//         if (err || !user) 
//         {            
//             console.log("user",err);
//             return res.json({ status: 401, success: false, message: "Authentication Fail." });
//         }
//         else if(user){
//             try{
    
//                 var file1 = (typeof req.files.product_image1 !== "undefined") ? req.files.product_image1[0].filename : '';
//                 console.log('filename1 ',file1 == '');
//                 if(file1 == ''){
//                    return res.status(400).send({ success:false, message: 'Please Provide product Image1.' }); 
//                 }
//                 else{
//                     file1 = './public/product/' + req.files.product_image1[0].filename;
//                     jimp.read(file1, function (err, img) {
//                     if (err) 
//                     throw err;
//                     img.resize(250, 250)            // resize
//                     .quality(100)              // set JPEG quality       
//                     .write('./public/product/' + file1) // save
//                     file1 = './public/product/' + file1;
//                     console.log('Resized !!', file1);              
//                 });
            
//                 }
            
//                 var file2 = (typeof req.files.product_image2 !== "undefined") ? req.files.product_image2[0].filename : '';
//                 console.log('filename2 ',file2 == '');
//                 if(file2 == ''){
//                     //res.status(400).send({ success:false, message: 'Please Provide Prescription Image.' }); 
//                     file2='';
//                 }
//                 else{
//                     file2 = './public/product/' + req.files.product_image2[0].filename;
//                     jimp.read(file2, function (err, img) {
//                     if (err) 
//                     throw err;
//                     img.resize(250, 250)            // resize
//                     .quality(100)              // set JPEG quality       
//                     .write('./public/product/' + file2) // save
//                     console.log('Resized !!',file2)              
//                 });
            
//                 }
            
//                 var file3 = (typeof req.files.product_image3 !== "undefined") ? req.files.product_image3[0].filename : '';
//                 console.log('filename3 ',file3 == '');
//                 if(file3 == ''){
//                     //res.status(400).send({ success:false, message: 'Please Provide Prescription Image.' }); 
//                     file3='';
//                 }
//                 else{
//                     file3 = './public/product/' + req.files.product_image3[0].filename;
//                     jimp.read(file3, function (err, img) {
//                     if (err) 
//                     throw err;
//                     img.resize(250, 250)            // resize
//                     .quality(100)              // set JPEG quality       
//                     .write('./public/product/' + file3) // save
//                     console.log('Resized !!',file3)              
//                 });
            
//                 }
            
//                 var file4 = (typeof req.files.product_image4 !== "undefined") ? req.files.product_image4[0].filename : '';
//                 console.log('filename4 ',file4 == '');
//                 if(file4 == ''){
//                     //res.status(400).send({ success:false, message: 'Please Provide Prescription Image.' }); 
//                     file4 = '';
//                 }
//                 else{
//                     file4 = './public/product/' + req.files.product_image4[0].filename;
//                     jimp.read( file4, function (err, img) {
//                     if (err) 
//                     throw err;
//                     img.resize(250, 250)            // resize
//                     .quality(100)              // set JPEG quality       
//                     .write('./public/product/' + file4) // save
//                     console.log('Resized !!',file4)              
//                 });
            
//                 }
//                 var product = new productModel(req.body,file1,file2,file3,file4);

                
//                 product.status=1;
//                 product.createdById= user[0].ad_id;
//                 product.creationDate = new Date;
//                 if(!product.product_name){
//                     return res.status(400).send({ success:false, message: 'Please Provide Product Name.' });        
//                 }
            
            
//                 else if(!product.product_descprition){
//                     return res.status(400).send({ success:false, message: 'Please Provide Product Descprition.' });        
//                 }
            
//               else if(!product.product_type_id){
//                     return res.status(400).send({ success:false, message: 'Please Select Product_type .' });        
//                 }
            
//                 else if(!product.product_brand_id){
//                     return res.status(400).send({ success:false, message: 'Please Select Product Brand Name.' });        
//                  }
//             else if(!product.product_capacity_id){
//                     return res.status(400).send({ success:false, message: 'Please Select Capacity Name.' });        
//                 }
            
//              else if(!product.product_brand_id){
//                    return res.status(400).send({ success:false, message: 'Please Select Product Brand Name.' });        
//                 }
            
//              else if(!product.product_quality_type_id){
//                   return res.status(400).send({ success:false, message: 'Please Select Quality Type Name.' });        
//              }
            
//              else if(!product.product_color_id){
//                 return  res.status(400).send({ success:false, message: 'Please Select Product Color Name.' });        
//             }
            
//             else if(!product.product_speed_id){
//                 return  res.status(400).send({ success:false, message: 'Please Select Product Speed .' });        
//             }
                
//             else if(!product.product_tags){
//                 return res.status(400).send({ success:false, message: 'Please Provide Product Product Tags.' });        
//             }
            
//             else if(!product.product_price){
//                 return res.status(400).send({ success:false, message: 'Please Provide Product Price.' });        
//                 }
            
//             else if(!product.product_discount){
//                     return res.status(400).send({ success:false, message: 'Please Provide Product Discount.' });        
//                 }
            
//              else if(!product.product_discount_price){
//                     return res.status(400).send({ success:false, message: 'Please Provide Product Discount Price Price.' });        
//                     }    
                
//              else if(!product.product_rent_price){
//                       return  res.status(400).send({ success:false, message: 'Please Provide Product Rent Price.' });        
//                     } 
              
//                 productModel.createProduct(product,function(err, data) 
//                 {
//                     if(err){
//                         res.send({status:400,success:false,message:"Details Not Saved."});
//                     }
//                     else{
//                         res.send({status:200,success:true,message:"Details Saves"});
//                     }
//                 });
//             //    }    
//             }catch(e){ console.log("catch",e);   }       
        
       
//         }


// })(req,res,next)
// };






// // /Get Product By Name
// module.exports.getProductByName = function(req,res,next)
// {
//     passport.authenticate('jwt',function(err,user)
//     {
//         if (err || !user) 
//         {          
//             return res.json({ status: 401, success: false, message: "Authentication Fail." });
//         }
//         else if(user){ 
//             productModel.getProductByName(req.params.product_name,function(err,data){
//                 if(err){
//                     res.send({status:400,success:false,message:"No Detail Found"});
//                 }
//                 else if(data.length==0){
//                     res.send({status:200,success:true,message:"No Detail Available"});
//                 } 
//                 else{
//                     res.send({status:200,success:true,message:
//                     "Detail Found", data:data});
//                 }
//             });
//        }
//   })(req,res,next)
// };



// //update Product Api..
// module.exports.updateProduct = function(req,res,next)
// {
//     passport.authenticate('jwt',function(err,user)
//     {
//         if (err || !user) 
//         {            
//             console.log("User",err);
//             return res.json({ status: 401, success: false, message: "Authentication Fail." });
//         }
//         else if(user)
//         {
//         try
//         {    
           
                
                
//                 var product = new productModel(req.body);
//                 console.log('Product', product);    

//                 // if(!product.product_name){
//                 //     res.status(400).send({ success:false, message: 'Please Provide Product Name.' });        
//                 // }
//                 // if(!product.product_price){
//                 //     res.status(400).send({ success:false, message: 'Please Provide Product Price.' });        
//                 // }
//                 // if(!product.product_discount){
//                 //     res.status(400).send({ success:false, message: 'Please Provide Product Discount.' });        
//                 // }
//                 // if(!product.product_actualprice){
//                 //     res.status(400).send({ success:false, message: 'Please Provide Product Actual Price.' });        
//                 // }               
//                 product.statu=1;
//                 product.modifiedById = user[0].ad_id;
//                 product.modificationDate = new Date;
//                 productModel.updateProduct(req.params.product_id,product, function(err, data) 
//                 {
//                     if(err){
//                         res.send({status:400,success:false,message:"Details not saved."});
//                     }
//                     else{
//                         res.send({status:200,success:true,message:data.message});
//                     }
//                 });
             
            
           
//         }catch(e){ console.log("catch",e);   }  }  
//   })(req,res,next)
// }