
const express=require('express');
const path= require('path')
const multer=require('multer');
const router=express.Router();
const { checktoken } = require('../../auth/token_validation.js');
const adminController = require('../controller/admin.controller.js');
const CapacityController = require('../controller/capacity.controller.js');
const { getColorList, createColor,  getColorById, colorUpdate, deleteColorByid} = require('../controller/color.controller.js');

const enquirycontroller= require('../controller/enquiry.controller.js')
const logincontroller=require('../controller/login.controller.js');
const categorycontroller=require('../controller/category.controller.js');
const category = require("../Model/Category.model.js");
const CategoryImage = require("../controller/Category.Controller.js");
const speedcontroller = require('../controller/speed.controller.js');
const qualitytypecontroller= require('../controller/quality_type.controller.js');

//admin login
 
const dir='./public/admin';
const upload=multer({
    storage:multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,dir)
        },
        filename:function(req,file,cb){
         cb(null, file.originalname);
        }
    })
}).single("user_file")
//user login   
//const upload = multer({ storage: storage })
const div ='./public/user';
const uploaded=multer({
    storage:multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,div)
        },
        filename:function(req,file,cb){
         cb(null, file.originalname);
        }
    })
}).single("image")






//color Routes
router.get('/getColor',checktoken,getColorList);
router.post('/addColor',checktoken,createColor);
router.get('/get/:Color_id',checktoken,getColorById);
router.delete('/deleteColor/:s_no',checktoken,deleteColorByid)
router.put('/updateColor/:s_no',checktoken,colorUpdate);  



//Admin login
router.post('/login',upload,adminController.adminLoginM);



//Capacity Routes
router.get("/capacityget",checktoken,CapacityController.getCapacity);
router.post('/capacitypost',checktoken,CapacityController.CreateCapacity);
router.get("/getcapacity/:Capacity_id",checktoken,CapacityController.getCapacityById);
router.put('/update/:s_no',checktoken,CapacityController.UpdatecapacitybyId);
router.delete('/capacitydelete/:s_no',checktoken,CapacityController.capacityDelete);



// user login  wale niche 
router.post('/userlogin',logincontroller.createNewlogin)
router.get('/getallenquiry',enquirycontroller.getenquirylist); 


 //create new enquiry post api
router.post('/insertenquiry',enquirycontroller.createNewEnquiry);


// Category ROutes
router.post('/insertcategory',uploaded,categorycontroller.categorylogin);
router.get('/getallcategory',categorycontroller.getcategorylist);


//Speed Routes
router.post('/insertspeed',speedcontroller.addspeed);
router.get('/getspeed',speedcontroller.getspeed);
router.get('/getspeedbyid/:speed_id',speedcontroller.getspeedbyid);
// router.put('/updatespeed/:s_no',speedcontroller.updatespeed);


//Quality Type
router.get('/getQualityType',qualitytypecontroller.getQualityType);
router.post('/insertqualitytype',qualitytypecontroller.addQualityType);



module.exports=router;






