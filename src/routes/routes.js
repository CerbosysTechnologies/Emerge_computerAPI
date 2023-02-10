const express=require('express');
const passport=require('passport');
require('../../authorization/passport')(passport)
const router = express.Router();
const colorController = require('../controllers/color.controller');
const adminController = require("../controllers/admin.controller"); 
const logincontroller=  require('../controllers/login.controller')
const enquirecontroller = require('../controllers/enquiry.controller.js')
const visitorcontroller =require('../controllers/visitor.controller')
const searchcontroller = require('../controllers/search.controller')

//Admin Routes
router.post("/adminLogin",adminController.adminlogin);


//Color Routes 
router.post("/colorAdd",colorController.addColor);
router.get("/getAllColor",colorController.getAllColor);
router.get("/getColorById/:color_id",colorController.getColorById);
router.put("/updateColorById/:color_id",colorController.updateColor);



// User Routes
router.post('/userLogin',logincontroller.userLogin)
router.post('/enquiry',enquirecontroller.createNewEnquiry)
router.get('/getallenquiry',enquirecontroller.getenquirylist)
router.post('/visitor',visitorcontroller.visitorLogin)
router.get('/searchproduct',searchcontroller.searchProduct)


// payment gateway





module.exports = router;
