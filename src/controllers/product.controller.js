const passport=require('passport');
const path=require('path');
const productModel = require('../models/product.model');
const jimp=require('jimp')


require("../../authorization/passport")(passport)



//insert Product Api.
// module.exports.insertProduct = function(req,res,next)
// {
//     passport.authenticate('jwt',function(err,admin)
//     {
//         console.log("IS Next", admin);
//         if (err || !admin) 
//         {            
//             console.log("Admin",err);
//             return res.json({ status: 401, success: false, message: "Authentication Fail." });
//         }
//         else if(admin)
//         {
//         try
//         {    console.log("its for image 1")
//             if(!req.file){
//                 console.log("its for image 2")
//                 return res.status(400).send({ success:false, message: 'Please Provide Product Images.' });        
//             }
//             else{ 
//             var fn = './public/product/' + req.file.filename;  
        
//              jimp.read(fn, function (err, img) {
//              if (err) 
//                 throw err;
//                 img.resize(250, 250)            // resize
//                 .quality(100)              // set JPEG quality       
//                 .write('./public/product/' + fn) // save
//                 console.log('Resized !!')              
//             });  
//             var product = new productModel(req.body,fn); 
//                 console.log('productModel', req.body);         
//                 console.log('Product Image', fn);

             
//                 if(!product.product_descprition){
//                     return res.status(400).send({ success:false, message: 'Please Provide Product Descprition.' });        
//                 }
                

//                 if(!product.product_brand_id){
//                     return res.status(400).send({ success:false, message: 'Please Select Product Brand Name.' });        
//                 }

//                 if(!product.product_capacity_id){
//                     return res.status(400).send({ success:false, message: 'Please Select Category Name.' });        
//                 }

//                 if(!product.product_type_id){
//                     return res.status(400).send({ success:false, message: 'Please Select Product_type .' });        
//                 }
//                 if(!product.product_speed_id){
//                     return   res.status(400).send({ success:false, message: 'Please Select Product Speed .' });        
//                 }
//                 if(!product.product_quality_type_id){
//                     return   res.status(400).send({ success:false, message: 'Please Select Quality Type Name.' });        
//                 }

//                 if(!product.product_name){
//                     return    res.status(400).send({ success:false, message: 'Please Provide Product Name.' });        
//                 }

//                 if(!product.product_color_id){
//                     return   res.status(400).send({ success:false, message: 'Please Select Product Color Name.' });        
//                 }
                
//                 if(!product.product_price){
//                     return   res.status(400).send({ success:false, message: 'Please Provide Product Price.' });        
//                 }
//                 if(!product.product_discount){
//                     return   res.status(400).send({ success:false, message: 'Please Provide Product Discount.' });        
//                 }
//                 if(!product.product_discount_price){
//                     return   res.status(400).send({ success:false, message: 'Please Provide Product Discount Price Price.' });        
//                 }

//                 if(!product.product_rent_price){
//                    return res.status(400).send({ success:false, message: 'Please Provide Product Rent Price.' });        
//                 }
                
//                 product.status=1;
//                 product.createdById = admin[0].ad_id;
//                 product.creationDate = new Date;
//                 product.image=req.file.path;
//                 productModel.addProduct(product, function(err, data) 
//                 {
//                     if(err){
//                         res.send({status:400,success:false,message:"Details not saved."});
//                     }
//                     else{
//                         res.send({status:200,success:true,message:data.message});
//                     }
//                 });
//             }    
//         }catch(e){ console.log("catch",e);   }  }  
// })(req,res,next)
// }


module.exports.insertProduct = function(req,res,next)
{
    passport.authenticate('jwt',function(err,admin)
    {
        console.log("IS Next", admin);
        if (err || !admin) 
        {            
            console.log("admin",err);
            return res.json({ status: 401, success: false, message: "Authentication Fail." });
        }
        else if(admin)
        {
        try
        {    
            if(!req.files){
                res.status(400).send({ success:false, message: 'Please Provide Product Image.' });        
            }
            else{ 
            var fn = './public/product/' + req.files.filename;  
            //let newfileName = req.file.filename + ".png"
             jimp.read(fn, function (err, img) {
             if (err) 
                throw err;
                img.resize(250, 250)            // resize
                .quality(100)              // set JPEG quality       
                .write('./public/product' + fn) // save
                console.log('Resized !!')              
            });  
            var product = new productModel(req.body,fn);    
            console.log('Pro', product);      
                 
                if(!product.product_descprition){
                    return res.status(400).send({ success:false, message: 'Please Provide Product Descprition.' });        
                }
                

               else if(!product.product_brand_id){
                    return res.status(400).send({ success:false, message: 'Please Select Product Brand Name.' });        
                }

                else if(!product.product_capacity_id){
                    return res.status(400).send({ success:false, message: 'Please Select Category Name.' });        
                }

               else  if(!product.product_type_id){
                    return res.status(400).send({ success:false, message: 'Please Select Product_type .' });        
                }
                else if(!product.product_speed_id){
                    return   res.status(400).send({ success:false, message: 'Please Select Product Speed .' });        
                }
                else if(!product.product_quality_type_id){
                    return   res.status(400).send({ success:false, message: 'Please Select Quality Type Name.' });        
                }

                else  if(!product.product_name){
                    return    res.status(400).send({ success:false, message: 'Please Provide Product Name.' });        
                }

                else if(!product.product_color_id){
                    return   res.status(400).send({ success:false, message: 'Please Select Product Color Name.' });        
                }
                
                else if(!product.product_price){
                    return   res.status(400).send({ success:false, message: 'Please Provide Product Price.' });        
                }
                else if(!product.product_discount){
                    return   res.status(400).send({ success:false, message: 'Please Provide Product Discount.' });        
                }
               else if(!product.product_discount_price){
                    return   res.status(400).send({ success:false, message: 'Please Provide Product Discount Price Price.' });        
                }

                else if(!product.product_tags){
                    return   res.status(400).send({ success:false, message: 'Please Provide Product Product Tags.' });        
                }

                else if(!product.product_rent_price){
                   return res.status(400).send({ success:false, message: 'Please Provide Product Rent Price.' });        
                }            
                product.status=1;
                product.createdById = admin[0].ad_id;
                product.creationDate = new Date;
                productModel.createProduct(product, function(err, data) 
                {
                    if(err){
                        res.send({status:400,success:false,message:"Details not saved."});
                    }
                    else{
                        res.send({status:200,success:true,message:data.message, product_id: data.id});
                    }
                });
            }    
        }catch(e){ console.log("catch",e);   }  }  
  })(req,res,next)
}





// GetAll Products
module.exports.getAllProducts = function(req,res,next)
{
    passport.authenticate('jwt',function(err,admin)
     {
      if (err || !admin) 
        {          
            return res.json({ status: 401, success: false, message: "Authentication Fail." });
         }
     else if(user){ 
            productModel.getAllProducts(function(err,data){
                if(err){
                    res.send({status:400,success:false,message:"No Detail Found"});
                }
                else if(data.length==0){
                    res.send({status:200,success:true,message:"No Detail Available"});
                } 
                else{
                    res.send({status:200,success:true,message:
                    "Detail Found", data:data});
                }
            });
      }
 })(req,res,next)
}


// product Acativate Deactivate Product
module.exports.activateDeactivateProduct = function(req,res,next)
{
    passport.authenticate('jwt',function(err,admin)
    {
        if (err || !admin) 
        {          
            return res.json({ status: 401, success: false, message: "Authentication Fail." });
        }
        else if(admin){ 
        
        var status = req.params.status;           
        productModel.deleteProduct(req.params.product_id,status,function(err, data) 
        {
            if(err){
                res.send({status:400,success:false,message:"Status not saved."});
            }           
            else{
                res.send({status:200,success:true,message:data.message});
            }
        }); 
      
    }
  })(req,res,next)
}

// update Product
// module.exports.updateProduct = function(req,res,next)
// {
//     passport.authenticate('jwt',function(err,admin)
//     {
//         if (err || !admin) 
//         {            
//             console.log("admin",err);
//             return res.json({ status: 401, success: false, message: "Authentication Fail." });
//         }
//         else if(admin)
//         {
//         try
//         {    
//             if(!req.file)
//             {
//                 //res.status(400).send({ success:false, message: 'Please Provide Product Image.' });
                
//                 var product = new productModel(req.body);
//                 console.log('Product', product); 
//                 console.log("kaha ho") ;

//                 if(!product.product_name){
//                   return  res.status(400).send({ success:false, message: 'Please Provide Product Name.' });        
//                 }
//                 else if(!product.product_price){
//                     return  res.status(400).send({ success:false, message: 'Please Provide Product Price.' });        
//                 }
//                 else if(!product.product_discount){
//                     return  res.status(400).send({ success:false, message: 'Please Provide Product Discount.' });        
//                 }
                            
//                 product.status=1;
//                 product.modifiedById = admin[0].ad_id
//                 product.modificationDate = new Date;
//                 productModel.updateProductM(req.params.product_id,product, function(err, data) 
//                 {

//                     if(err){
//                         res.send({status:400,success:false,message:"Details not saved."});
//                     }
//                     else{
//                         res.send({status:200,success:true,message:data.message});
//                     }
//                 });
//             }    
            
//             else{ 
//             var fn = './public/product/' + req.file.filename;  
//             //let newfileName = req.file.filename + ".png"
//              jimp.read(fn, function (err, img) {
//              if (err) 
//                 throw err;
//                 img.resize(250, 250)            // resize
//                 .quality(100)              // set JPEG quality       
//                 .write('./public/product/' + fn) // save
//                 console.log('Resized !!')              
//             });  
//             var product = new productModel(req.body,fn);  


//                 if(!product.product_name){
//                     return  res.status(400).send({ success:false, message: 'Please Provide Product Name.' });        
//                 }
//                else if(!product.product_price){
//                     return   res.status(400).send({ success:false, message: 'Please Provide Product Price.' });        
//                 }
//                 else if(!product.product_discount){
//                     return   res.status(400).send({ success:false, message: 'Please Provide Product Discount.' });        
//                 }
//                 else if(!product.product_actualprice){
//                     return   res.status(400).send({ success:false, message: 'Please Provide Product Actual Price.' });        
//                 }               
//                 product.status=1;
//                 product.modifiedById = user[0].id;
//                 product.modificationDate = new Date;
//                 productModel.updateProductM(req.params.product_id,product, function(err, data) 
//                 {
//                     if(err){
//                         res.send({status:400,success:false,message:"Details not saved."});
//                     }
//                     else{
//                         res.send({status:200,success:true,message:data.message});
//                     }
//                 });
//             }    
//         }catch(e){ console.log("catch",e);   }  }  
//   })(req,res,next)
// }




