// get all enquiry list
const enquiry = require("../model/enquiry.model.js");
const enquiryModel = require("../model/enquiry.model.js");


exports.getenquirylist=(req,res)=>{
    //console.log("here are the all employees list");
    enquiry.getAllenquiry((err,enquiry)=>{
        console.log("we are here it call me again and i wroking");
        if(err)
        res.send(err)
        console.log('enquiry',enquiry);
        res.send(enquiry)

    })
}

//create new enquiry
exports.createNewEnquiry =(req,res)=>{
   const enquiryReqdata= new enquiryModel(req.body)
    console.log('req.body',req.body);
    //check null 
//------------------------
    if(req.body.constuctor===Object && Object.keys(req.body).length ===0)
    {
        res.send(400).send({success:false,message:"please fill fields"});
    }
    
    else{
        console.log("vaild data success");
         enquiryModel.createEnquiry(enquiryReqdata,(err,enquiry)=>{
            if(err)
            res.send(err);
            res.json({status:true, message:"created", data:enquiry})
            
            // console.dir(req.body.task);
        })
    }
}
//----------------
