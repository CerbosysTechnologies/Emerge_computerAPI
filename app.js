const express= require('express');
const cors = require('cors');
const passport = require('passport');
const pool = require('./authorization/config');
const router = require('./src/routes/routes'); 
const expressLayouts =require('express-ejs-layouts');
const app=express();

app.use(expressLayouts)
app.set('view engine', 'ejs');
app.set('views','./views')

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(passport.initialize());
require('./authorization/passport')(passport);

app.use("/emerge",router);
app.use("/checkout",require('./src/routes/razorpay.js'));




const port=4020;


app.listen(port,()=>{
    console.log("server runing at "+port)
})