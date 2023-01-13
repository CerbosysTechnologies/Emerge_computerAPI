const CapacityModel = require("../Model/capacity.model");
exports.getCapacity=(req,res)=>{
    CapacityModel.getCapacityM((err,capacity)=>{
        if(err){
            res.send({status:400, success:false, message:"error while fetching Capacity", data:err})
        }
        else{
            res.send({status:200,success:true,message:"Capacity details fetched successfully",data:capacity });
        }
    })
}


exports.CreateCapacity=(req,res)=>{
    console.log('create capacity ');
    console.log('req.body',req.body);
    const Data=new CapacityModel(req.body)
    if(!Data.Capacity_id){
        return res.send({success:false, status:400, message:"please fill Capacity_id "})
    }
    else if(!Data.Capacity_Name){
        return res.send({success:false, status:400, message:"please fill Capacity_name"})

    }
    else{
        console.log("valid data");
        Data.statusId=1;
        Data.creationDate= new Date;
        Data.file.path;
        CapacityModel.addCapacity(Data,(err,capacity)=>{
          
           if(err){
                res.send({status:400,success:false, message:"someting went wrong",data:err})
            }
            
                
                else{
                    res.send({status:200,success:true,message:"color inserting sucessfully",data:capacity})
                }
            
             })
            }
}
exports.getCapacityById=(req,res)=>{
    // res.send("its for capacity by id");
    var Capacity_id=req.params.Capacity_id;
    CapacityModel.getCapacityByidM([Capacity_id],(err,capacity)=>{
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
    CapacityModel.UpdateCapacity([req.params.s_no],Data,function(err,capacity){
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
    CapacityModel.capacityDeleteM(s_no,function(err,capacity){
        if(err){
            res.send({status:400,success:false,message:'Error While Fetching Color'});
        }
        else
        {
            res.send({status:200,success:true, message:"Capacity Deleted Successfully"});
        }

    })
}

