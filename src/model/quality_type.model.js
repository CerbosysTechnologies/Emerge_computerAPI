const pool = require("../../dbconnection/config.js");
var QualityType= function(qualitytype) {
    this.s_no= qualitytype.s_no;
    this.quality_type_id = qualitytype.quality_type_id;
    this.quality_type_name= qualitytype.quality_type_name;
    this.quality_type =qualitytype.quality_type;
    this.statusId = qualitytype.statusId;
    this.createdById = qualitytype.createdById;
    this.creationDate = qualitytype.creationDate;
    this.modifiedById = qualitytype.modifiedById;
    this.modificationDate = qualitytype.modificationDate;
  }

  QualityType.getQualityType= (result) => {
    pool.query("select * from qualitytype", (err, res) => {
      if (err) {
        console.log("Error While Fetching Qualitytype", err);
        result(err, null);
      } else {
        console.log("Quality_type Fetched Successfully");
        result(null, res);
      }
    })
  };
  
  QualityType.addQualityType=(qulity_type,result)=>{
    pool.query('insert into qualitytype set ?',qulity_type,(err,res)=>{
      if(err){
        console.log('Error While Inserting Data ')
        result(null,err)
      }
      else{
        console.log("QualityType Inserted");
        result(null, res);
      }
    })

  }
  
  module.exports =QualityType;