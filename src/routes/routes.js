const express=require('express')
const router = express.Router();

const adminController = require("../controllers/admin.controller");

//Admin Routes
router.post("/postadmin",adminController.adminlogin)


module.exports=router;
