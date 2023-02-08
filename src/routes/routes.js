const express=require('express');
const passport=require('passport');
require('../../authorization/passport')(passport)
const router = express.Router();


const adminController = require("../controllers/admin.controller");
const colorController = require('../controllers/color.controller');
const logincontroller=  require('../controllers/login.controller.js');

//Admin Routes
router.post("/adminLogin",adminController.adminlogin);


//Color Routes
router.post("/colorAdd",colorController.addColor);
router.get("/getAllColor",colorController.getAllColor);
router.get("/getColorById/:color_id",colorController.getColorById);
router.put("/updateColorById/:color_id",colorController.updateColor);








router.post('/login',logincontroller.adminlogin)

// there is routs 




module.exports= router;
