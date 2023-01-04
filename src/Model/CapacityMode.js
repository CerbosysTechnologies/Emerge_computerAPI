var pool=require('../../dbconnection/config.js')
var Capacity=function(capacity){
this.s_no=capacity.s_no;
this.Capacity_id=capacity.Capacity_id
this.Capacity_Name=capacity.Capacity_Name;
this.status=capacity.status;
this.statusId=capacity.statusId;
this.createdById=capacity.createdById;
this.creationDate=capacity.creationDate;
this.modifiedById = capacity.modifiedById;
this.modificationDate =capacity.modificationDate;
}
Capacity.getCapacityM=(result)=>{
    pool.query("select *from capacity",(err,res)=>{
        if(err){
            console.log("error while fetching Capacity",err)
            result(null,err)
        }
        else{
            console.log("capacity fetched successfully")
            result(null,res)
        }
    })
}

Capacity.addCapacity=(Data,result)=>{
    pool.query('INSERT INTO capacity SET ?',Data,(err,res)=>{
        if(err){
            console.log('Error while inserting data')
            result(null,err)
 }
        else{
            console.log("data inserted");
            result(null,res);

        }
    })
}
Capacity.getCapacityByidM=function(Capacity_id,result){
    pool.query('SELECT * FROM capacity WHERE Capacity_id=?',[Capacity_id],function(err,res){
        if(err){
            console.log('error while fetching capacity by Capacity_id',err)
            result(null,err)
        }
        else{
            result(null,res)
        }

    })
}
Capacity.UpdateCapacity=function(s_no,Data,result){
    pool.query('update capacity set Capacity_id=?,Capacity_Name=?,status=?,statusId=?,createdById=?,creationDate=?,modifiedById=?,modificationDate=? where s_no=?',[
        Data.Capacity_id,Data.Capacity_Name,Data.status,Data.statusId,Data.createdById,Data.creationDate,Data.modifiedById,Data.modificationDate,s_no],function(err,res){
            if(err){
                console.log("error while updating capacity")
                result(null,err)
    
            }
            else{
          console.log('capacity updateting')
          result(null,res)

        }
    })
}

Capacity.capacityDeleteM=function(s_no,result){
    pool.query("delete from capacity where s_no=?",[s_no],function(err,res){
        if (err) {
            console.log("error while deleting data");
            result(null, err);
          } else {
            result(null, res);
          }

    })
}
module.exports=Capacity;


