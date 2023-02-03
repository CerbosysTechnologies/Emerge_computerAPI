const express= require('express');
const cors = require('cors');
const pool = require('./authorization/config');
const router = require('./src/routes/routes');
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use("/emerge",router);



const port=4020

app.listen(port,()=>{
    console.log("server runing at  = "+port)
})