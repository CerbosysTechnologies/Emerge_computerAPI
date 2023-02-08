const express= require('express');
const cors = require('cors');
const passport = require('passport');
const pool = require('./authorization/config');
const router = require('./src/routes/routes');








const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(passport.initialize());
require('./authorization/passport')(passport);

app.use("/emerge",router);
/* Accept header wiht request */





const port=4020;


app.listen(port,()=>{
    console.log("server runing at "+port)
})