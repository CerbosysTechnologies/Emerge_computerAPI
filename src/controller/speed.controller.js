const speedmodel = require("../model/speed.model")

exports.addspeed=function(req,res){
   
    var speeddata=new speedmodel(req.body);
    console.log('req.body',req.body);

    if(!speeddata.speed_id){
        return res.send({success:false, status:400, message:"Please Fill Speed_id Field "})
    }
    if(!speeddata.speed_Name){
        return res.send({success:false, status:400, message:"Please fill Speed_Name Field "})

    }
    if(!speeddata.status){
        return res.send({success:false, status:400, message:"Please fill Status Field "})
    }
    
    if(!speeddata.speed){
        return res.send({success:false, status:400, message:"Please fill Speed Field "})

    }

    else {
        console.log("valid data");
        speeddata.statusId=1;
        speeddata.creationDate= new Date;
     speedmodel.addspeedM(speeddata,function(err,speed){
        if(err){
            res.send({data:err,status:400, success:false, message:"someting went wrong"})
        }
            else{
             
            // res.send({status:false, message :"someting went wrong"})
           res.send({status:200, success:true, message:"Speed Inserting Sucessfully", data:speed})
            }

    })
}
}

exports.getspeed=function(req,res){
    speedmodel.getspeedM((err,speed)=>{
        console.log('we are here');
        if(err){
            res.send({status:400,success:false,message:'error while fetching Speed'});
        }
        else
        {
            res.send({status:200,success:true,data:speed, message:"Color Details Fetched Successfully"});
        }
        })
    
}

exports.getspeedbyid=function(req,res){
    var speed_id=req.params.speed_id;
    speedmodel.getspeedbyid(speed_id,(err,speed)=>{
        if(err){
            res.send({status:400,success:false,message:'Error While Fetching Speed DEtails'});
        }
        else if(speed.length==0){
            res.send({status:200,success:true,message:"No Detail Available"});
        } 
       
        else
        {
            res.send({status:200,success:true,data:speed, message:"Speed Details Fetched Successfully"});
        }
    })
}
   
// exports.updatespeed=function(req,res){
//  var speeddata=new speedmodel(req.body)
//     speeddata.modifiedById=1;
//     speeddata.modificationDate=new Date;
//     speedmodel.updatespeedm([req.params.s_no],speeddata,function(err,speed){
//         if(err){
//             res.send({status:400,success:false,message:"something went wrong"});

//         }
//         else if(speed.length==0){ 

//             res.send({status:200,success:true,message:"No Detail Available"});

//         } 
//         else{
        
//             res.send({status:200,success:true,message:"Speed Updated",data:speed});






//         }
//     })
// }

// exports.UpdatecapacitybyId=function(req,res){
//     var Data=new CapacityModel(req.body);

//     Data.modifiedById=1;
//     Data.modificationDate= new Date;
//     CapacityModel.UpdateCapacity([req.params.s_no],Data,function(err,capacity){
//         if(err){
//             res.send({status:400,success:false,message:"something went wrong"});

//         }
//         else if(capacity.length==0){ 

//             res.send({status:200,success:true,message:"No Detail Available"});

//         } 
//         else{
        
//             res.send({status:200,success:true,message:"Capacity updated", data:capacity});
            
//         }
    
//     })

// }
    