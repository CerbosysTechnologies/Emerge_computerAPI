const express=require('express')
const router = express.Router();

const adminController = require("../controllers/admin.controller");

//Admin Routes
router.post("/postadmin",adminController.adminlogin)


module.exports=router;
const express =require('express')
const logincontroller=  require('../controllers/login.controller.js')




router.post('/login',logincontroller.createlogin)

// there is routs 




module.exports= router;
