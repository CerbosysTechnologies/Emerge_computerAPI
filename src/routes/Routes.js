
const express=require('express');
const path= require('path')
const multer=require('multer');
const util =require('util');
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
const laptopdetails = require('../controller/laptop.controller')
const laptopcontroller= require('../controller/laptop.controller')
const mousecontroller = require('../controller/k_mouse.controller.js')


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
const divv ='./public/product';
let multiupload=multer({
    storage:multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,divv)            
        },
        filename:function(req,file,cb){
            console.log('FileName', file.originalname);
         cb(null, file.originalname);
        }
    })
}).single('product_image')
//.........................images upload os monitor..................
var storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, path.join ('./public/monitor_image')
  )},
  filename:function(req,file,cb){
    cb(null,file.originalname)
    //console.log(file,"hedgfsfsdfg")
  }
  });
  var upload_2 = multer({ storage: storage }).array("image",10);
  var uploadFilesMiddleware = util.promisify(upload_2);
  module.exports = uploadFilesMiddleware;
//////////////////////////////////////////////////////////////////////

//.......................................................laptop images...........................................
var storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, path.join ('./public/monitor_image')
  )},
  filename:function(req,file,cb){
    cb(null,file.originalname)
    //console.log(file,"hedgfsfsdfg")
  }
  });
  var upload_3 = multer({ storage: storage }).array("image",10);
  var uploadlaptopMiddleware = util.promisify(upload_3);
  module.exports = uploadlaptopMiddleware;

/////////////////////////////////////////////////////////

//.............................................keyboard and mouse images....................................
var storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, path.join ('./public/monitor_image')
  )},
  filename:function(req,file,cb){
    cb(null,file.originalname)
    //console.log(file,"hedgfsfsdfg")
  }
  });
  var upload_4 = multer({ storage: storage }).array("image",10);
  var uploadmouseMiddleware = util.promisify(upload_4);
  module.exports = uploadmouseMiddleware;

/////////////////////////////////////////////////////////



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
//............................product api.................................
router.post('/insertproduct',multiupload,productlogin);
router.get('/getallproduct',productcontroller.getproductlist);
router.get('/getemployeeById/:product_id',productcontroller.getEmployeeByID)
router.patch('/productupdate/:product_id',multiupload,productcontroller.updateProduct)
router.delete('/deleteproduct/:product_id',productcontroller.deleteproductbyid)
//..................... moniter api.............................................................
router.post('/insertmonitor',uploadFilesMiddleware,monitorcontroller.monitordetails)
router.get('/getallmonitor',monitorcontroller.getmonitorlist)
router.get('/getmonitorById/:monitor_id',monitorcontroller.getmonitorByID)
router.put('/monitorupdate/:monitor_id',uploadFilesMiddleware,monitorcontroller.updatemonitor)

//....................Laptop api...............................................................
router.post('/insertlaptop',uploadlaptopMiddleware,laptopcontroller.laptopdetails)
router.get('/getallLaptop',laptopcontroller.getlaptoplist)
router.get('/getlaptopById/:laptop_id',laptopcontroller.getlaptopByID)
router.put('/laptopupdate/:laptop_id',uploadlaptopMiddleware,laptopcontroller.updatelaptop)

//.................keyboard and mouse api...............................
router.post('/insertmouse',uploadmouseMiddleware,mousecontroller.k_mousedetails)
router.get('/getallmouse',mousecontroller.getmouselist)
router.get('/getmouseById/:id',mousecontroller.getmouseByID)
router.put('/mouseupdate/:id',uploadmouseMiddleware,mousecontroller.updatemouse)



module.exports=router;






