const mysql=require("mysql");
const pool = require("../../authorization/config");

const Speed = function (speed) {
    this.speed_id = speed.speed_id;
    this.speed_name = speed.speed_name;
    this.speed = speed.speed;
    this.status = speed.status;
    this.creationDate = speed.creationDate;
    this.createdById= speed.createdById;
    this.modificationDate = speed.modificationDate ;
    this.modifiedById = speed.modifiedById;
  };


Speed.insertSpeedM=function(speed,result){
    pool.query("INSERT INTO speed SET ?",speed,function(err,res){
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


  //Get All Speed
  Speed.getAllSpeedM = function (result) {       
    pool.query("select * from speed where status=1", function (err, res) {
            if(err) {
                console.log(err);
                result(err, null);
            }
            else{                       
                result(null, res);

            }
        });           
}

//GET Speed BYID
Speed.getSpeedByIdM = function (speed_id, result) {       
    pool.query(`select * from speed Where status=1 and speed_id=?`,[speed_id], function (err, res) {
            if(err) {
                console.log(err);
                result(err, null);
            }
            else{                       
                result(null, res);

            }
        });           
};


// UPdate Speed Details
Speed.updateSpeedM = function (speed_id,speed,result) {       
    pool.query("update speed SET speed_name=?,speed=?, modifiedById=?, modificationDate=? where speed_id=?", 
    [speed.speed_name,speed.speed,speed.modifiedById, speed.modificationDate,speed_id], function (err, res) {
            if(err) {
                console.log(err);
                result(err, null);
            }
            else{                       
                result(null, {status:200,success:true,message:"Details Updated Successfully."});

            }
        });           
};


  module.exports=Speed;
