
const express=require('express');
const path= require('path')
const multer=require('multer');
const router=express.Router();
const { chechkToken } = require('../../auth/token_validation.js');
const adminController = require('../controller/adminController.js');
const CapacityController = require('../controller/CapacityController.js');
const { getColorList, createColor,  getColorById, colorUpdate, deleteColorByid} = require('../controller/colorController.js');

const enquirycontroller= require('../controller/enquiry.controller.js')
const logincontroller=require('../controller/login.controller.js');
const categorycontroller=require('../controller/category.controller.js');
const category = require("../Model/Category.model.js");
const CategoryImage = require("../controller/Category.Controller.js");

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
const div ='./public/user';
const uploaded=multer({
    storage:multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,div)
        },
        filename:function(req,file,cb){
         cb(null, path.extname(file.originalname));
        }
    })
}).single("image")






//color Routes
router.get('/getColor',chechkToken,getColorList);
router.post('/addColor',chechkToken,createColor);
router.get('/get/:Color_id',chechkToken,getColorById);
router.delete('/deleteColor/:s_no',chechkToken,deleteColorByid)
router.put('/updateColor/:s_no',chechkToken,colorUpdate);
//Admin login
router.post('/login',upload,adminController.adminLoginM);
//Capacity Routes
router.get("/capacityget",chechkToken,CapacityController.getCapacity);
router.post('/capacitypost',chechkToken,CapacityController.CreateCapacity);
router.get("/getcapacity/:Capacity_id",chechkToken,CapacityController.getCapacityById);
router.put('/update/:s_no',chechkToken,CapacityController.UpdatecapacitybyId);
router.delete('/capacitydelete/:s_no',CapacityController.capacityDelete);

// user login  wale niche 
router.post('/userlogin',logincontroller.createNewlogin)

router.get('/getallenquiry',enquirycontroller.getenquirylist);
  
 //create new enquiry post api
router.post('/insertenquiry',enquirycontroller.createNewEnquiry);


// Category api 
router.post('/insertcategory',uploaded,categorycontroller.categorylogin);

module.exports=router;






