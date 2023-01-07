const QualityType = require("../model/quality_type.model");



    exports.getQualityType=(req,res)=>{
    QualityType.getQualityType((err,qualitytype)=>{
    
        if(err){
            res.send({status:400,success:false,message:'Error While Fetching Qualitytype'});
        }
        else
        {
            res.send({status:200,success:true,data:qualitytype, message:"Qualitytype Details Fetched Successfully"});
        }
        })
    }
  
    exports.addQualityType=(req,res)=>{
        console.log('req.body',req.body)
        var qualitydata=new QualityType(req.body) 

        if(!qualitydata.quality_type_id){
            return res.send({success:false, status:400, message:"Please Fill QualityTypeId "})
        }
        if(! qualitydata.quality_type_name){
            return res.send({success:false, status:400, message:"Please Fill QualityTypeName"})
        }
        if(! qualitydata.quality_type){
            return res.send({success:false, status:400, message:"Please Fill QualityType"})
        }
        else{
            qualitydata.statusId=1;
            qualitydata.creationDate= new Date;
            // ColorData.createdById=res.id;
            QualityType.addQualityType(qualitydata,(err,quality_type)=>{
                if(err){
                    res.send({data:err,status:400, message:"Someting Went Wrong"})
                }
                    else{
                     
                    // res.send({status:false, message :"someting went wrong"})
                   res.send({status:200, message:"QualityType Inserting Sucessfully", data:quality_type})
                    }
    
            })

        }



    }

    // exports.createColor=(req,res)=>{
    //     console.log('create Color ');
    //     console.log('req.body',req.body);
    //     var ColorData=new ColorModel(req.body)
     
    //      if(!ColorData.Color_Name){
         
    //         return res.send({success:false, status:400, message:"please fill Color_Name "})
    //     }
    //     else if(! ColorData.Color_id){
    //         return res.send({success:false, status:400, message:"please fill Color_id"})
    //  }
    // else{
    //         console.log("valid data");
    //         ColorData.statusId=1;
    //         ColorData.creationDate= new Date;
    //         // ColorData.createdById=res.id;
    //         colormodel.addNewColor(ColorData,(err,color)=>{
    //             if(err){
    //                 res.send({data:err,status:400, message:"someting went wrong"})
    //             }
    //                 else{
                     
    //                 // res.send({status:false, message :"someting went wrong"})
    //                res.send({status:200, message:"color inserting sucessfully", data:color, insertId:res.id})
    //                 }
    
    //         })
    //     }
    // }