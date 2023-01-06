
const express= require('express');
const multer=require('multer');
const cors = require('cors');
const path=require('path')
const pool = require('./dbconnection/config.js');
const router = require('./src/routes/routes.js');


const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use("/emerge",router);
app.use(cors())



const PORT=process.env.PORT||2233;
app.listen(PORT,()=>{
    console.log("server runing at"+PORT)
})
