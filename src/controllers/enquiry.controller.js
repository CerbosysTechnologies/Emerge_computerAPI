const enquiry = require('../models/enquiry.model.js')

//create new enquiry
exports.createNewEnquiry =(req,res)=>{
    const enquiryReqdata= req.body
     console.log('here is the data check at controller', enquiryReqdata);
    
     if(!enquiryReqdata.name){
        return res.send({success:false, status:400, message:"please fill name "})
    }
    else  if(!enquiryReqdata.mobile_number){
        return res.send({success:false, status:400, message:"please fill number "})
    }
    else  if(!enquiryReqdata.category){
        return res.send({success:false, status:400, message:"please select category "})
    }
    else  if(!enquiryReqdata.quantity){
        return res.send({success:false, status:400, message:"please select quantity "})
    }
    else  if(!enquiryReqdata.tenure){
        return res.send({success:false, status:400, message:"please select tenure "})
    }
     
     else{
        
        enquiryReqdata.statusId=1;
        enquiryReqdata.creationDate=new Date()
        enquiryReqdata.modificationDate=new Date()
         console.log("vaild data success");
         enquiry.createEnquiry(enquiryReqdata,(err,enquiry)=>{
             if(err)
             res.send(err);
             res.json({status:true, message:"created", data:enquiry})
             
         })
     }
 }


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

 