const express=require('express');
const passport=require('passport');
const multer=require('multer');
require('../../authorization/passport')(passport)
const DIR = './public/product_type';
let storage = multer.diskStorage({	
    destination: function (req, file, callback) {
      callback(null, DIR);        
    },
    filename: function (req, file, cb) 
    {      
      cb(null, file.originalname);      
 	}
});
let upload = multer({storage: storage});


const router = express.Router();
const colorController = require('../controllers/color.controller');
const adminController = require("../controllers/admin.controller"); 
const logincontroller=  require('../controllers/login.controller')
const enquirecontroller = require('../controllers/enquiry.controller.js')
const visitorcontroller =require('../controllers/visitor.controller')
const searchcontroller = require('../controllers/search.controller')

const productTypeController= require('../controllers/product_type.controller');
const speedController = require('../controllers/speed.controller');
const qualityTypeController = require('../controllers/quality_type.model');

//Admin Routes
router.post("/adminLogin",adminController.adminlogin);


//Color Routes 
router.post("/colorAdd",colorController.addColor);
router.get("/getAllColor",colorController.getAllColor);
router.get("/getColorById/:color_id",colorController.getColorById);
router.put("/updateColorById/:color_id",colorController.updateColor);


//Product_Type  Routes
router.post("/addProductType",upload.single('image'),productTypeController.addProductType);
router.get("/getAllProduct",productTypeController.getAllProductType);
router.get("/getProductTypeById/:product_type_id",productTypeController.getProductTypeById)
// router.put("/updateProductTYpe/:product_type_id",upload.single('image'),productTypeController.updateProductType);


//Speed Routers
router.post("/insertSpeed",speedController.insertSpeed);
router.get("/getAllSpeed",speedController.getAllSpeed);
router.get("/getAllSpeed/:speed_id",speedController.getSpeedById);
router.put("/updateSpeed/:speed_id",speedController.updateSpeed);

//Quality Type
router.post("/insertQualityType",qualityTypeController.insertQualityType)



// User Routes
router.post('/userLogin',logincontroller.userLogin)
router.post('/enquiry',enquirecontroller.createNewEnquiry)
router.get('/getallenquiry',enquirecontroller.getenquirylist)
router.post('/visitor',visitorcontroller.visitorLogin)
router.get('/searchproduct',searchcontroller.searchProduct)








module.exports = router;
