const express= require('express');
const cors = require('cors');
const pool = require('./authorization/config');
const app=express();

const port=4020
app.listen(port,()=>{
    console.log("server runing at"+port)
})