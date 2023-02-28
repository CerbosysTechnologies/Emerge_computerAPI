const mysql=require('mysql');
const pool = require('../../authorization/config');


const Capacity = function (capacity) {
    this.capacity_id = capacity.capacity_id;
    this.capacity_name = capacity.capacity_name;
    this.statusId=capacity.statusId;
    this.createdById = capacity.createdById;
    this.creationDate= capacity.creationDate;
    this.modifiedById = capacity.modifiedById ;
    this.modificationDate = capacity.modificationDate;
  };


// Add Capacity
Capacity.createCapacity = function (capacity, result) {
    
    pool.query(`select capacity_name from capacity where capacity_name = '${capacity.capacity_name}'`,function(err,res){
        if(err){
            console.log("Select If",err);
        }


        else{
            try{               
                //if(new String(res[0].category_name).valueOf() === new String(category.category_name).valueOf()){
                if(res.length != 0){
                    result(err,{status:400,success:false,message:"Capacity Name is already saved."}) ;
                }
                else{
                    pool.query("INSERT INTO capacity SET ?", capacity, function (err, res) {
                    if(err) {
                        result(err, null);
                    }                
                    else{                               
                        result(null, {status:200,success:true,message:"Details Saved Successfully."});
                    }
                    });
                }
            }catch(e){console.log(e)}
        }
    });
           
};


// Update Capacity
Capacity.updateCapacityM = function (capacity_id,capacity, result) {
    
    pool.query(`select capacity_name from capacity where capacity_name = '${capacity.capacity_name}'`,function(err,res){
        if(err){
            console.log("Select If",err);
        }


        else{
            try{               
                //if(new String(res[0].category_name).valueOf() === new String(category.category_name).valueOf()){
                if(res.length != 0){
                    result(err,{status:400,success:false,message:"Capacity is already saved."}) ;
                }
                else{
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
                }
            }catch(e){console.log(e)}
        }
    });
           
};

// Update Capacity

//   Capacity.updateCapacityM = function (capacity_id,capacity,result) {       
//     pool.query("update capacity SET capacity_name=?, modifiedById=?, modificationDate=? where capacity_id=?", 
//     [capacity.capacity_name,capacity.modifiedById, capacity.modificationDate,capacity_id], function (err, res) {
//             if(err) {
//                 console.log(err);
//                 result(err, null);
//             }
//             else{                       
//                 result(null, {status:200,success:true,message:"Details Updated Successfully."});

//             }
//         });           
// };


Capacity.getAllCapacityM = function (result) {       
    pool.query("select * from capacity where statusId=1  order by capacity_id desc", function (err, res) {
            if(err) {
                console.log(err);
                result(err, null);
            }
            else{                       
                result(null, res);

            }
        });           
}

// Get Capacity By Id
Capacity.getCapacityById= function (capacity_id, result) {       
    pool.query(`select * from capacity Where statusId=1 and capacity_id=?`,[capacity_id], function (err, res) {
            if(err) {
                console.log(err);
                result(err, null);
            }
            else{                       
                result(null, res);

            }
        });           
};



// Get Capacity By Name
Capacity.getCapacityByName= function (capacity_name, result) {       
    pool.query(`select * from capacity Where statusId=1 and capacity_name=?`,[capacity_name], function (err, res) {
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