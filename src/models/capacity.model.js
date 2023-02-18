const mysql=require('mysql');
const pool = require('../../authorization/config');


const Capacity = function (capacity) {
    this.capacity_id = capacity.capacity_id;
    this.capacity_name = capacity.capacity_name;
    this.status=capacity.status;
    this.createdById = capacity.createdById;
    this.creationDate= capacity.creationDate;
    this.modifiedById = capacity.modifiedById ;
    this.modificationDate = capacity.modificationDate;
  };



  Capacity.insertCapacity=function(capacity,result){
    pool.query("INSERT INTO capacity SET ?",capacity,function(err,res){
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


  Capacity.updateCapacityM = function (capacity_id,capacity,result) {       
    pool.query("update capacity SET capacity_name=?, modifiedById=?, modificationDate=? where capacity_id=?", 
    [capacity.capacity_name,capacity.modifiedById, capacity.modificationDate,capacity_id], function (err, res) {
            if(err) {
                console.log(err);
                result(err, null);
            }
            else{                       
                result(null, {status:200,success:true,message:"Details Updated Successfully."});

            }
        });           
};


Capacity.getAllCapacityM = function (result) {       
    pool.query("select * from capacity where status=1  order by capacity_id desc", function (err, res) {
            if(err) {
                console.log(err);
                result(err, null);
            }
            else{                       
                result(null, res);

            }
        });           
}


Capacity.getCapacityById= function (capacity_id, result) {       
    pool.query(`select * from capacity Where status=1 and capacity_id=?`,[capacity_id], function (err, res) {
            if(err) {
                console.log(err);
                result(err, null);
            }
            else{                       
                result(null, res);

            }
        });           
};

  module.exports=Capacity;