const express= require('express');
const cors = require('cors');
const pool = require('./authorization/config');
const router = require('./src/routes/routes'); 
const expressLayouts =require('express-ejs-layouts');

const app=express();
app.use(expressLayouts)
app.set('view engine', 'ejs');
app.set('views','./views')

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use("/emerge",router);
app.use("/checkout",require('./src/routes/razorpay.js'));


const port=4020

app.listen(port,()=>{
    console.log("server runing at  = "+port)
})