const mysql=require('mysql');
const pool = require('../../authorization/config');
const QualityType = function (qualitytype) {
    this.quality_type_id = qualitytype.quality_type_id;
    this.quality_type_name = qualitytype.quality_type_name;
    this.quality_type= qualitytype.quality_type;
    this.status = qualitytype.status;
    this.createdById = qualitytype.createdById;
    this.creationDate= qualitytype.creationDate;
    this.modificationDate = qualitytype.modificationDate ;
    this. modifiedById= qualitytype.modifiedById;
  };


  QualityType.insertQualityTypeM=function(qt,result){
    pool.query("INSERT INTO quality_type SET ?",qt,function(err,res){
        if(err) {
            console.log(err);
            result(err, null);
        }
        else{
            console.log(res.insertId);         
            result(null, {status:200,success:true,message:"Details Saved Successfully."});

        }
    })
  }


  module.exports=QualityType;