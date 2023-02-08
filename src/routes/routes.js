const express=require('express')
const router = express.Router();

const adminController = require("../controllers/admin.controller"); 
const logincontroller=  require('../controllers/login.controller.js')
const enquirecontroller = require('../controllers/enquiry.controller.js')

//Admin Routes
router.post("/postadmin",adminController.adminlogin)



// User Routes
router.post('/login',logincontroller.createlogin)
router.post('/enquiry',enquirecontroller.createNewEnquiry)
router.get('/getallenquiry',enquirecontroller.getenquirylist)


// payment gateway





module.exports = router;
