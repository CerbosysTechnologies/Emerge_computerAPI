const capacitymodel = require("../model/capacity.model");
exports.getCapacity=(req,res)=>{
    capacitymodel.getCapacityM((err,capacity)=>{
        if(err){
            res.send({status:400, success:false, message:"Error While Fetching Capacity", data:err})
        }
        else{
            res.send({status:200,success:true,message:"Capacity Details Fetched Successfully",data:capacity });
        }
    })
}


exports.CreateCapacity=(req,res)=>{
    console.log('create capacity ');
    console.log('req.body',req.body);
    const Data=new  capacitymodel(req.body)
    if(!Data.Capacity_id){
        return res.send({success:false, status:400, message:"Please Fill Capacity_id "})
    }
    else if(!Data.Capacity_Name){
        return res.send({success:false, status:400, message:"Please Fill Capacity_name"})

    }
    else{
        console.log("valid data");
        Data.statusId=1;
        Data.creationDate= new Date;
        Data.file.path;
        capacitymodel.addCapacity(Data,(err,capacity)=>{
          
           if(err){
                res.send({status:400,success:false, message:"Someting Went Wrong",data:err})
            }
            
                
                else{
                    res.send({status:200,success:true,message:"Color Inserting Sucessfully",data:capacity})
                }
            
             })
            }
}
exports.getCapacityById=(req,res)=>{
    // res.send("its for capacity by id");
    var Capacity_id=req.params.Capacity_id;
    capacitymodel.getCapacityByidM([Capacity_id],(err,capacity)=>{
        if(err){
            res.send({status:400,success:false,message:'error while fetching capacity'});
        }
        else
        {
          
            res.send({status:200,success:true,data:capacity, message:"capacity details fetched successfully"});
        }


    })

}
exports.UpdatecapacitybyId=function(req,res){
    var Data=new CapacityModel(req.body);

    Data.modifiedById=1;
    Data.modificationDate= new Date;
    capacitymodel.UpdateCapacity([req.params.s_no],Data,function(err,capacity){
        if(err){
            res.send({status:400,success:false,message:"something went wrong"});

        }
        else if(capacity.length==0){ 

            res.send({status:200,success:true,message:"No Detail Available"});

        } 
        else{
        
            res.send({status:200,success:true,message:"Capacity updated", data:capacity});
            
        }
    
    })

}
exports.capacityDelete=function(req,res){
    var s_no=req.params.s_no;
    capacitymodel.capacityDeleteM(s_no,function(err,capacity){
        if(err){
            res.send({status:400,success:false,message:'Error While Fetching Color'});
        }
        else
        {
            res.send({status:200,success:true, message:"Capacity Deleted Successfully"});
        }

    })
}

