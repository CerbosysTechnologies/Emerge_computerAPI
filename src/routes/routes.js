const express=require('express');
const passport=require('passport');
const multer=require('multer');
const util =require('util');
const path=require('path')


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
let uploadProdutType = multer({storage: storage});


//-----------------------Product multer---------------------------


const Dir= './public/product/';
let storageProduct = multer.diskStorage({	
    destination: function (req, file, callback) {
      callback(null, Dir);        
    },
    filename: function (req, file, cb) 
    {      
      cb(null, file.originalname); 
        
 	}
});
let uploadProdut = multer({storage: storageProduct}).fields([{name:'product_image1',maxCount:1},{name:'product_image2',maxCount:1},{name:'product_image3',maxCount:1},{name:'product_image4',maxCount:1}])

//  let uploadProdut=multer({storage:storageProduct}).single("image");
//////////////////////


//.............................................shopping cart....................................
var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join ('public/cart')
)},
filename:function(req,file,cb){
  cb(null,file.originalname)
  //console.log(file,"hedgfsfsdfg")
}
});
var upload_5 = multer({ storage: storage }).array("product_image",10);
var uploadMiddleware = util.promisify(upload_5);
module.exports = uploadMiddleware;

/////////////////////////////////////////////////////////



const router = express.Router();
const colorController = require('../controllers/color.controller');
const adminController = require("../controllers/admin.controller"); 
const logincontroller=  require('../controllers/login.controller')
const enquirecontroller = require('../controllers/enquiry.controller.js')
const addresscontroller =require('../controllers/address.controller')
const searchcontroller = require('../controllers/search.controller')
const productTypeController= require('../controllers/product_type.controller');
const speedController = require('../controllers/speed.controller');
const qualityTypeController = require('../controllers/quality_type.controller');
const brandController = require('../controllers/brand.controller');
const capacityController= require('../controllers/capacity.controller');
const ordercontrollerr= require('../controllers/order.controller');
const orderdetailcontroller= require('../controllers/orderdetails.controller');

const productController = require('../controllers/product.controller');
const paymentcontroller = require('../controllers/paymentdetails.controller')
const shoppingcartcontroller=require("../controllers/shopingcart.controller")
const wishlistcontroller = require("../controllers/wishlist.controller")
const getallproduct = require("../controllers/getproduct.controller")
//-----------------------Admin Api---------------------------
router.post("/adminLogin",adminController.adminlogin);


//-----------------------Color Api Routes---------------------------
router.post("/colorAdd",colorController.addColor);
router.get("/getAllColor",colorController.getAllColor);
router.get("/getColorById/:color_id",colorController.getColorById);
router.put("/updateColorById/:color_id",colorController.updateColor);
router.get("/getColorByName/:color_name",colorController.getColorByName);


//-----------------------Product Type Api---------------------------
router.post("/addProductType",uploadProdutType.single('product_type_image'),productTypeController.insertProductType);
router.get("/getAllProductType",productTypeController.getAllProductType);
router.get("/getProductTypeById/:product_type_id",productTypeController.getProductTypeById)
router.put("/updatePrductType/:product_type_id",uploadProdutType.single('product_type_image'),productTypeController.updateProductType);
router.get("/getProductTypeByName/:product_type_name",productTypeController.getProductTypeByName)










//-----------------------Speed Api---------------------------
router.post("/insertSpeed",speedController.insertSpeed);
router.get("/getAllSpeed",speedController.getAllSpeed);
router.get("/getAllSpeed/:speed_id",speedController.getSpeedById);
router.put("/updateSpeed/:speed_id",speedController.updateSpeed);
router.get("/getSpeedByName/:speed_name",speedController.getSpeedByName)



//-----------------------Quality TYpe Api---------------------------
router.post("/insertQualityType",qualityTypeController.insertQualityType);
router.get("/getAllQualityType",qualityTypeController.getAllQualityType);
router.get("/getQualityTypeById/:quality_type_id",qualityTypeController.getQualityTypeById);
router.put("/updateQualiType/:quality_type_id",qualityTypeController.updateQualityType);
router.get("/getQualityByName/:quality_type_name",qualityTypeController.getQualityByName);


//add product
//router.post("/addproduct",uploadMiddleware,productController.insertProduct)


//-----------------------Brand Api---------------------------
router.post("/insertBrand",uploadBrand.single("brand_image"),brandController.insertBrand);
router.put("/updateBrand/:brand_id",uploadBrand.single("brand_image"),brandController.updateBrand);
router.get("/getAllBrand",brandController.getAllBrand);
router.get("/getBrandById/:brand_id",brandController.getBrandById);
router.get("/getBrandByName/:brand_name",brandController.getBrandByName)



//-----------------------Capacity Api---------------------------
router.post("/insertCapacity",capacityController.insertCategory);
router.put("/updateCapacity/:capacity_id",capacityController.updateCapacity);
router.get("/getAllCapacity",capacityController.getAllCapacity);
router.get("/getcapacitybyId/:capacity_id",capacityController.getCapacityById)
router.get("/getCapacityByName/:capacity_name",capacityController.getCapacityByName)

//-----------------------Product Api---------------------------
// router.post("/insertProduct",uploadProdut,productController.insertProduct);
// router.get("/getAllProduct",productController.getAllProducts);
// router.put("/activateDeactivateProduct/:product_id/:status",productController.activateDeactivateProduct);
// router.put("/imageUpdate/:product_id",uploadProdut,productController.updateProductImage)
// router.get('/getCountProducts',productController.getCountProducts);
// router.get("/getProductById/:product_id",productController.getProductById);
// router.get("/getProductByName/:product_name",productController.getProductByName);
// router.put("/updateProduct/:product_id",productController.updateProduct)








//-----------------------User Api---------------------------
router.post('/userLogin',logincontroller.userLogin)

//----------------------Enquiry Api---------------------------
router.post('/enquiry',enquirecontroller.createNewEnquiry)
router.get("/getAllEnquiry",enquirecontroller.getAllEnquiry);
router.get("/getEnquiryByName/:name",enquirecontroller.getEnquiryByName);



router.post('/address',addresscontroller.visitorLogin)
router.get('/searchproduct',searchcontroller.searchProduct)
//..............orderdetails Api......................
router.post('/insertOrderDetail',orderdetailcontroller.oderdata)


//..............payment chechkout details......................
router.get('/paymentdetails',paymentcontroller.getpaymentdetails)

//-------------------order api-----------------------------------
router.post("/insertorder",ordercontrollerr.createorder)


//...................shopping cart..................................

router.post("/addToCart",uploadMiddleware,shoppingcartcontroller.addcart)
router.get("/clearcart",shoppingcartcontroller.clearcart)
router.get("/getcartitmes",shoppingcartcontroller.totalcartitem)
router.get("/gettotalquantity",shoppingcartcontroller.gettotalqantity)
router.get("/allcartitems",shoppingcartcontroller.UserCartItems)

//......................wishlist api ..................................
router.post("/addwishlist",wishlistcontroller.createWishlist)
router.get("/deletewishlist",wishlistcontroller.deleteWishlist)






//............Get product api ............


router.get("/getallmoniter",getallproduct.getmoniter)
router.get("/getalllaptop",getallproduct.getlaptop)
router.get("/getmouse",getallproduct.getmouse)
router.get("/getkeyboard",getallproduct.getkeyboard)
router.get("/getcpu",getallproduct.getcpu)
router.get("/getgamingcpu",getallproduct.getgamingcpu)
router.get("/getharddisk",getallproduct.getHarddisk)
router.get("/getcomputer",getallproduct.getcomputer)






module.exports = router;
