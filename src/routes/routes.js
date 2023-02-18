const express=require('express');
const passport=require('passport');
const multer=require('multer');
const util =require('util');


require('../../authorization/passport')(passport)


//-----------------------Brand multer---------------------------
const DESIGNDIR = './public/brand';
let storageBrand = multer.diskStorage({	
    destination: function (req, file, callback) {
      callback(null, DESIGNDIR);        
    },
    filename:function(req, file, cb) 
    {      
      cb(null, file.originalname);      
 	}
});
let uploadBrand = multer({storage: storageBrand}); 



//-----------------------PRoduct_typr multer---------------------------
const DIR = './public/product_type';
var storage = multer.diskStorage({	
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

//-----------------------Admin Api---------------------------
router.post("/adminLogin",adminController.adminlogin);


//-----------------------Color Api Routes---------------------------
router.post("/colorAdd",colorController.addColor);
router.get("/getAllColor",colorController.getAllColor);
router.get("/getColorById/:color_id",colorController.getColorById);
router.put("/updateColorById/:color_id",colorController.updateColor);


//-----------------------Product Type Api---------------------------
router.post("/addProductType",uploadProdutType.single('image'),productTypeController.addProductType);
router.get("/getAllProduct",productTypeController.getAllProductType);
router.get("/getProductTypeById/:product_type_id",productTypeController.getProductTypeById)
router.put("/updatePrductType/:product_type_id",uploadProdutType.single('image'),productTypeController.updateProductType)








//-----------------------Speed Api---------------------------
router.post("/insertSpeed",speedController.insertSpeed);
router.get("/getAllSpeed",speedController.getAllSpeed);
router.get("/getAllSpeed/:speed_id",speedController.getSpeedById);
router.put("/updateSpeed/:speed_id",speedController.updateSpeed);



//-----------------------Quality TYpe Api---------------------------
router.post("/insertQualityType",qualityTypeController.insertQualityType);
router.get("/getAllQualityType",qualityTypeController.getAllQualityType);
router.get("/getQualityTypeById/:quality_type_id",qualityTypeController.getQualityTypeById);
router.put("/updateQualiType/:quality_type_id",qualityTypeController.updateQualityType);




//-----------------------Brand Api---------------------------
router.post("/insertBrand",uploadBrand.single("image"),brandController.insertBrand);
router.put("/updateBrand/:brand_id",uploadBrand.single("image"),brandController.updateBrand);
router.get("/getAllBrand",brandController.getAllBrand);
router.get("/getBrandById/:brand_id",brandController.getBrandById)



//-----------------------Capacity Api---------------------------
router.post("/insertCapacity",capacityController.insertCapacity);
router.put("/updateCapacity/:capacity_id",capacityController.updateCapacity);
router.get("/getAllCapacity",capacityController.getAllCapacity);
router.get("/getcapacitybyId/:capacity_id",capacityController.getCapacityById)

//-----------------------Product Api---------------------------
router.post("/insertProduct",uploadProdut,productController.insertProduct);
router.get("/getAllProduct",productController.getAllProducts);
router.put("/activateDeactivateProduct/:product_id/:status",productController.activateDeactivateProduct);
// router.put("/updateProduct/:product_id",productController.updateProduct)
// router.put("/imageUpdate/:product_id",uploadProdut,productController.updateProductImage)




//add product
router.post("/addproduct",uploadgcpuMiddleware,productcontroller.productadd)

//-----------------------User Api---------------------------
router.post('/userLogin',logincontroller.userLogin)

//----------------------Enquiry Api---------------------------
router.post('/enquiry',enquirecontroller.createNewEnquiry)
router.get('/getallenquiry',enquirecontroller.getenquirylist)
router.post('/visitor',visitorcontroller.visitorLogin)
router.get('/searchproduct',searchcontroller.searchProduct)
//..............orderdetails Api......................
router.post('/insertOrderDetail',orderdetailcontroller.insertOrderdetail)


//..............payment chechkout details......................
router.get('/paymentdetails',paymentcontroller.getpaymentdetails)

//-------------------order api-----------------------------------
router.post("/insertorder",ordercontrollerr.createorder)














module.exports = router;
