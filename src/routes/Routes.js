const express=require('express');
const multer=require('multer');
const router=express.Router();


const { chechkToken } = require('../../auth/token_validation.js');
const adminController = require('../controller/adminController.js');
const CapacityController = require('../controller/CapacityController.js');
const { getColorList, createColor,  getColorById, colorUpdate, deleteColorByid} = require('../controller/colorController.js');


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


module.exports=router;


