
const register = require('../models/visitor.model.js')


exports.visitorLogin =(req,res)=>{

   // console.log(req.body,"here is the controllerr ");
    var visitorReqdata = new register(req.body)

     if(!visitorReqdata.mobile_number){
       // console.log(visitorReqdata.mobile_number);
        return res.send({success:false, status:400, message:"please fill mobile number"})
    }
    else if(isNaN(visitorReqdata.mobile_number))
     {
    
    return res.send({success:false, status:400, message:"Plz Enter digit value in mobile number"})
      }
     
    //   else  if(loginReqdata.mobile_number.length>5 || loginReqdata.mobile_number.length<11)
    //   {
    // //    err5.innerHTML = "Enter Only 10 digits";
    // return res.send({success:false, status:400, message:"Plz Enter vaild mobile number"})
   
    //   }
    else{



        var mobile_number =visitorReqdata.mobile_number

        //console.log(mobile_number)

    
       register.checkdetails(mobile_number,function(err,result){
           if(err) throw err
           else
            {
               console.log(result,"chekiiiiiiinnngggggggngngngngngnn")

           }
          
            console.log(result,"bgbxsdfbvxcfgsvzxcvetwtsgxcvx")
         if(result==0)
            {
            
               visitorReqdata.statusId=1;
               visitorReqdata.creationDate=new Date()
               visitorReqdata.modificationDate=new Date()
               
               register.createvisitor(visitorReqdata,(err,register)=>{
                   if (err)
                   res.send({ status: false, message: "something went wrong" });
               else
                   res.send({ status: true, message: "register success", data: register })
               })
            }
          else
            {
console.log("welcome =",+mobile_number);
res.send({ status: true, message:"welcome", mobile_number });

            }

       })
       
    }

}