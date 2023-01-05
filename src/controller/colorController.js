
// const { query } = require("express");


const { query } = require("express");
const ColorModel= require("../model/colorModel");

     // console.log("i am here");
     exports.getColorList=(req,res)=>{
    ColorModel.getColor((err,Color)=>{
        console.log('we are here');
        if(err){
            res.send({status:400,success:false,message:'error while fetching Color'});
        }
        else
        {
            res.send({status:200,success:true,data:Color, message:"Color details fetched successfully"});
        }
        })
    }

exports.createColor=(req,res)=>{
    console.log('create Color ');
    console.log('req.body',req.body);
    const ColorData=new ColorModel(req.body)
 
     if(!ColorData.Color_Name){
     
        return res.send({success:false, status:400, message:"please fill Color_Name "})
    }
    else if(! ColorData.Color_id){
        return res.send({success:false, status:400, message:"please fill Color_id"})
 }
else{
        console.log("valid data");
        ColorData.statusId=1;
        ColorData.creationDate= new Date;
        // ColorData.createdById=res.id;
        ColorModel.addNewColor(ColorData,(err,color)=>{
            if(err){
                res.send({data:err,status:400, message:"someting went wrong"})
            }
                else{
                 
                // res.send({status:false, message :"someting went wrong"})
               res.send({status:200, message:"color inserting sucessfully", data:color, insertId:res.id})
                }

        })
    }
}



        
exports.getColorById=(req,res)=>{
    //res.send("its for search");
    var Color_id=req.params.Color_id;
    ColorModel.getColoridModel(Color_id,(err,color)=>{
        if(err){
        res.send({status:400,success:false,message:'error while fetching Color'});
    }
    else
    {
        res.send({status:200,success:true,data:color, message:"Color details fetched successfully"});
    }

    })
}
exports.deleteColorByid=function(req,res){
    var s_no=req.params.s_no;
    ColorModel.deleteColor(s_no,function(err,color){
        if(err){
            res.send({status:400,success:false,message:'error while fetching Color'});
        }
        else
        {
            res.send({status:200,success:true, message:"Color deleted successfully"});
        }

    })
}
exports.colorUpdate=function(req,res){
    var colorData=new ColorModel(req.body)
    colorData.modifiedById=1;
    colorData.modificationDate= new Date;
    ColorModel.updateColorM([req.params.s_no],colorData,function(err,color){
        if(err){
            res.send({status:400,success:false,message:"Something Went Wrong"});

        }
        else if(color.length==0){
            res.send({status:200,success:true,message:"No Detail Available"});
        } 
        else{
              res.send({status:200,success:true,message:"Color Updated", data:color});
             }

    })

}





