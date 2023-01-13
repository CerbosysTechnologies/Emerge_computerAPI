const pool = require("../../dbconnection/config.js");
var Monitor=  function(Monitor,file){
    this.monitor_id = Monitor.monitor_id;
    this.image_1 = file; 
    this.image_2 = file; 
    this.image_3 = file; 
    this.image_4 = file;
    this.monitor_name = Monitor.monitor_name; 
    this.monitor_buy_at = Monitor.monitor_buy_at;
    this.monitor_rent_at = Monitor.monitor_rent_at;
    this.description = Monitor.description;
    this.highlight_1 = Monitor.highlight_1;
    this.highlight_2 = Monitor.highlight_2;
    this.highlight_3 = Monitor.highlight_3;
    this.highlight_4 = Monitor.highlight_4;
    this.status_id = Monitor.status_id;
    this.createdById = Monitor.createdById;
    this.creation_Date = new Date();
    this.modifiedById = Monitor.modifiedById;
    this.modificationDate = new Date();
  }
///////////////////////////////
  Monitor.getAllMonitor=(result)=>{
    pool.query('SELECT * FROM Monitor',(err,res)=>{
        if(err){
            console.log("err is occure while fetching data",err);
            result(null,err);
        }
        else{
            console.log("employee fetching sucessfully");
            result(null,res);
        }
    })
}

///////////////////////////////

Monitor.getmonitorById=(monitor_id,result)=>{
    
  pool.query('SELECT * FROM monitor WHERE monitor_id=?',[monitor_id],(err,res)=>{
  if(err)
  {
      console.log('error while fetching the monitor by id',err);
      result(err,null)
  }
  else{
      console.log('respons ',res);
      result(null,res)
  }

  })
}

/////////////////////////////

  Monitor.addmonitor=function(Monitor,result){
    console.log(Monitor,"cheking monitor");

    pool.query("INSERT INTO monitor SET ?", Monitor, function (err, res) {
     // console.log(err,res,"chekuingggggggg");
      if(err) {
        
          console.log(err);
          //result(null, err);
      }
      else{
          console.log(res.insertId);         
          result(null, {status:200,success:true,message:"Details Saved Successfully.", id: res.insertId});

      }
  }); 
  }


  

  module.exports=Monitor;