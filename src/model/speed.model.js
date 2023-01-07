const pool = require("../../dbconnection/config");
var Speed=function(speed){
    this.s_no=speed.s_no;
    this.speed_id=speed.speed_id;
    this.speed_Name=speed.speed_Name;
    this.status=speed.status;
    this.speed=speed.speed;
    this.statusId=speed.statusId;
    this.createdById=speed.createdById;
    this.creationDate=speed.creationDate;
    this.modifiedById=speed.modifiedById;
    this.modificationDate=speed.modificationDate

}
//Add Speed
Speed.addspeedM=function(speeddata,result){
    pool.query('insert into speed set ?',speeddata,function(err,res){
        if(err){
            console.log('Error While In Add Speed')
            result(null,err)
            
        }
        else{
            console.log("Speed Added");
            result(null,res);
         }
         })
}
//Get Speed
Speed.getspeedM=function(result){
    pool.query("select * from speed", (err, res) => {
        if (err) {
          console.log("error while fetching Speed", err);
          result(null, err);
        } else {
          console.log("Speed Fetched Successfully");
          result(null, res);
        }
      })

}
Speed.getspeedbyid=function(speed_id,result){
  pool.query('select * from speed where speed_id=?',[speed_id],function(err,res){
    if (err) {
      console.log("error while fetching color by s_no", err);
      result(null, err);
    } else {
      result(null, res);
    }

  })

}


// Speed.updatespeedm=function(s_no,speeddata,result){
//   pool.query('update speed set speed_id=?,speed_Name=?,status=?,speed=?,statusId=?,createdById=?,creationDate=?,modifiedById=?,modificationDate=? where speed_id=?',[speeddata.speed_id,speeddata.speed_Name,speeddata.status,speeddata.speed,speeddata.statusId,speeddata.createdById,speeddata.creationDate,speeddata.modifiedById,speeddata.modificationDate,s_no],function(err,res){
//     if(err){
//       console.log("Error While Updating Speed")
//       result(null,err)

//   }
//   else{
// console.log('Speed Updateting')
// result(null,res)
// }
// })
// }

module.exports=Speed;


// Capacity.UpdateCapacity=function(s_no,Data,result){
//   pool.query('update capacity set Capacity_id=?,Capacity_Name=?,status=?,statusId=?,createdById=?,creationDate=?,modifiedById=?,modificationDate=? where s_no=?',[
//       Data.Capacity_id,Data.Capacity_Name,Data.status,Data.statusId,Data.createdById,Data.creationDate,Data.modifiedById,Data.modificationDate,s_no],function(err,res){
//           if(err){
//               console.log("error while updating capacity")
//               result(null,err)
  
//           }
//           else{
//         console.log('capacity updateting')
//         result(null,res)

//       }
//   })
// }




