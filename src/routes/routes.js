const express =require('express')
const logincontroller=  require('../controllers/login.controller.js')



const router =express.Router()


router.post('/login',logincontroller.createlogin)

// there is routs 




module.exports= router;