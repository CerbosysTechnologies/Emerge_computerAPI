
const express=require('express');
const path= require('path')
const multer=require('multer');
const router=express.Router();
const { chechkToken } = require('../../auth/token_validation.js');
const adminController = require('../controller/adminController.js');
const CapacityController = require('../controller/capacity.controller.js');
const { getColorList, createColor,  getColorById, colorUpdate, deleteColorByid} = require('../controller/color.controller.js');

const enquirycontroller= require('../controller/enquiry.controller.js')
const logincontroller=require('../controller/login.controller.js');
const categorycontroller=require('../controller/category.controller.js');
const category = require("../Model/Category.model.js");
const CategoryImage = require("../controller/Category.Controller.js");
const { productlogin } = require('../controller/productcontroller.js');
const productcontroller =require('../controller/productcontroller.js')
const deleteproductbyid =require('../controller/productcontroller.js');
const monitorcontroller =require('../controller/monitorcontroller.js')
const getproductlist = require('../controller/monitorcontroller.js')
const getmonitorByID =require('../controller/monitorcontroller.js')



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
let uploaded=multer({
    storage:multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,div)
        },
        filename:function(req,file,cb){
         cb(null, file.originalname);
        }
    })
}).single("image");

//.........................for uploading  images in user account...................
const divv ='./public/user';
let multiupload=multer({
    storage:multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,div)
        },
        filename:function(req,file,cb){
         cb(null, file.originalname);
        }
    })
}).single('product_image')

//...........................for monitor images............................
// const storage = multer.diskStorage({
//     destination: './upload/images',
//     filename: (req, file, cb) => {
//         return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
//     }
// });
// const upload = multer({
//     storage: storage,
// }).fields([{
//     name: 'image_1',
//     maxCount: 1
// }, {
//     name: 'image_2',
//     maxCount: 1
// }]);
 const storage=multer.diskStorage({
        destination:'./public/user/monitor_image',
        filename:function(req,file,cb){
         cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
        }
    });
const multi = multer({
    storage: storage,
}).fields([{
    name: 'image_1',
    maxCount: 1
}, {
    name: 'image_2',
    maxCount: 1
},
{
    name: 'image_3',
    maxCount: 1
},{
    name: 'image_4',
    maxCount: 1
},

]);




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

////////// user//////user////user/////user/// login  wale niche 
router.post('/userlogin',logincontroller.createNewlogin)
router.get('/getallenquiry',enquirycontroller.getenquirylist);  
 //create new enquiry post api
router.post('/insertenquiry',enquirycontroller.createNewEnquiry);
// Category api 
router.post('/insertcategory',uploaded,categorycontroller.categorylogin);
router.get('/getallcategory',categorycontroller.getcategorylist);
router.post('/insertproduct',multiupload,productlogin);
router.get('/getallproduct',productcontroller.getproductlist);
router.get('/getemployeeById/:product_id',productcontroller.getEmployeeByID)
router.put('/productupdate/:product_id',productcontroller.updateProduct)
router.delete('/deleteproduct/:product_id',productcontroller.deleteproductbyid)
//..................... moniter api.............................................................
router.post('/insertmonitor',multi,monitorcontroller.monitordetails)
router.get('/getallmonitor',monitorcontroller.getmonitorlist)
router.get('/getmonitorById/:monitor_id',monitorcontroller.getmonitorByID)


module.exports=router;






