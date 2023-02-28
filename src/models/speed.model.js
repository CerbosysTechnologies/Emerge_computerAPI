const mysql = require("mysql");
const pool = require("../../authorization/config");
const Capacity = require("./capacity.model");

const Speed = function (speed) {
    this.speed_id = speed.speed_id;
    this.speed_name = speed.speed_name;
    this.statusId = speed.statusId;
    this.creationDate = speed.creationDate;
    this.createdById= speed.createdById;
    this.modificationDate = speed.modificationDate ;
    this.modifiedById = speed.modifiedById;
  };

// Add Speed
  Speed.addSpeed = function (speed, result) {       
    pool.query(`select speed_name from speed where speed_name ='${speed.speed_name}'`, function (err, res) {
            if(err) {
                console.log(err);
            }
            else{
                try {
                    if(res.length!=0){
                        result(err,{status:400,success:false,message:"Speed Name is Already Saved."}) 
                    }
                    else{
                        pool.query("INSERT INTO speed SET ?", speed, function (err, res) {
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


  //Get All Speed
  Speed.getAllSpeedM = function (result) {       
    pool.query("select * from speed where statusId=1  order by speed_id desc", function (err, res) {
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
    pool.query(`select * from speed Where statusId=1 and speed_id=?`,[speed_id], function (err, res) {
            if(err) {
                console.log(err);
                result(err, null);
            }
            else{                       
                result(null, res);

            }
        });           
};


// // UPdate Speed Details
// Speed.updateSpeedM = function (speed_id,speed,result) {       
//     pool.query("update speed SET speed_name=?, modifiedById=?, modificationDate=? where speed_id=?", 
//     [speed.speed_name,speed.modifiedById, speed.modificationDate,speed_id], function (err, res) {
//             if(err) {
//                 console.log(err);
//                 result(err, null);
//             }
//             else{                       
//                 result(null, {status:200,success:true,message:"Details Updated Successfully."});

//             }
//         });           
// };

// Update Speed
Speed.updateSpeedM = function (speed_id,speed, result) {       
    pool.query(`select speed_name from speed where speed_name ='${speed.speed_name}'`, function (err, res) {
            if(err) {
                console.log(err);
            }
            else{
                try {
                    if(res.length!=0){
                        result(err,{status:400,success:false,message:"Speed is Already Saved."}) 
                    }
                    else{
                        pool.query("update speed SET speed_name=?, modifiedById=?, modificationDate=? where speed_id=?", 
    [speed.speed_name,speed.modifiedById, speed.modificationDate,speed_id], function (err, res) {
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


//Get Speed By Name
Speed.getSpeedByName = function (speed_name, result) {       
    pool.query(`select * from speed Where statusId=1 and speed_name=?`,[speed_name], function (err, res) {
            if(err) {
                console.log(err);
                result(err, null);
            }
            else{                       
                result(null, res);

            }
        });           
};



  module.exports=Speed;
