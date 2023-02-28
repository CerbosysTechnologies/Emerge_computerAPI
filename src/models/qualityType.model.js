const mysql=require('mysql');
const pool = require('../../authorization/config');
const QualityType = function (qualitytype) {
    this.quality_type_id = qualitytype.quality_type_id;
    this.quality_type_name = qualitytype.quality_type_name;
    this.statusId = qualitytype.statusId;
    this.createdById = qualitytype.createdById;
    this.creationDate= qualitytype.creationDate;
    this.modificationDate = qualitytype.modificationDate ;
    this. modifiedById= qualitytype.modifiedById;
  };


 // Add Quality Type
 QualityType.insertQuality= function (qualityType, result) {       
    pool.query(`select quality_type_name from quality_type where quality_type_name ='${qualityType.quality_type_name}'`, function (err, res) {
            if(err) {
                console.log(err);
            }
            else{
                try {
                    if(res.length!=0){
                        result(err,{status:400,success:false,message:"Quality is Already Saved."}) 
                    }
                    else{
                        pool.query("INSERT INTO quality_type SET ?", qualityType, function (err, res) {
                            if(err) {
                                result(err, null);
                            }                
                            else{                               
                                result(null, {status:200,success:true,message:"Details Saved Successfully."});
                            }
                            });
                    }
                    
                } catch (e) {
                    console.log(e)
                }
            }
        });           
};



    //Get All QualityType
    QualityType.getAllQualityTypeM = function (result) {       
        pool.query("select * from quality_type where statusId=1  order by quality_type_id desc", function (err, res) {
                if(err) {
                    console.log(err);
                    result(err, null);
                }
                else{                       
                    result(null, res);
    
                }
            });           
    }

    //Get Quality Type ById
    QualityType.getQualityTypeById = function (quality_type_id, result) {       
    pool.query(`select * from quality_type Where statusId=1 and quality_type_id=?`,[quality_type_id], function (err, res) {
            if(err) {
                console.log(err);
                result(err, null);
            }
            else{                       
                result(null, res);

            }
        });           
};

// Updated Quality Type
QualityType.updateQualitytype= function (quality_type_id,qt, result) {       
    pool.query(`select quality_type_name from quality_type where quality_type_name ='${qt.quality_type_name}'`, function (err, res) {
            if(err) {
                console.log(err);
            }
            else{
                try {
                    if(res.length!=0){
                        result(err,{status:400,success:false,message:"Quality is Already Saved."}) 
                    }
                    else{
                        pool.query("update quality_type SET quality_type_name=?, modifiedById=?, modificationDate=? where quality_type_id=?", 
                        [qt.quality_type_name,qt.modifiedById, qt.modificationDate,quality_type_id], function (err, res) {
                                if(err) {
                                    console.log(err);
                                    result(err, null);
                                }
                                else{                       
                                    result(null, {status:200,success:true,message:"Details Updated Successfully."});
                    
                                }
                            });  
                    }
                    
                } catch (e) {
                    console.log(e)
                }
            }
        });           
};



    //Get Quality Type By Name
    QualityType.getQualityByName = function (quality_type_name, result) {       
        pool.query(`select * from quality_type Where statusId=1 and quality_type_name=?`,[quality_type_name], function (err, res) {
                if(err) {
                    console.log(err);
                    result(err, null);
                }
                else{                       
                    result(null, res);
    
                }
            });           
    };

  module.exports=QualityType;