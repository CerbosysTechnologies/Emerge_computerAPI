const K_mouse = require("../Model/k_mouse.model.js");
const Monitor = require("../Model/monitor.model.js");
//const monitor = require("../Model/monitor.model.js");

//...................get all monitor list.......................//
exports.getmonitorlist = (req, res) => {
  console.log("here are the all monitors list");
  //    this.product_image=req.file.path;
  Monitor.getAllMonitor((err, monitor) => {
    if(err){
      res.send({status:400, success:false, message:"error while fetching monitor", data:err})
  }
  else{
      res.send({status:200,success:true,message:"monitor details fetched successfully",data:monitor });
  }
    
    });
};
///////////////////////////////////////////////////////////////

//...................................get all monitor  by id..............//
exports.getmonitorByID = (req, res) => {
  console.log("get monitor by id is here you get monitor ");
  Monitor.getmonitorById(req.params.monitor_id, (err, monitor) => {
    if(err){
      res.send({status:400,success:false,message:'error while fetching monitor'});
  }
  else
  {
    res.send({status:200,success:true,data:monitor, message:"monitor details fetched successfully"});
  }

  });
};

/////////////////////////////////////////////////////

//.......................................................
exports.monitordetails = (req, res) => {
  var monitordata = new Monitor(req.body);
  var image = req.files;
  if(!monitordata.monitor_id){
    return res.send({success:false, status:400, message:"please fill monitor_id "})
}

else if(!monitordata.monitor_name){
 return res.send({success:false,status:400,message:"please fill monitor name"})
}
else if(!monitordata.monitor_buy_at){
  return res.send({success:false,status:400,message:"please enter buy prize"})
 }
 else if(!monitordata.description){
  return res.send({success:false,status:400,message:"please enter description"})
 }
 else if(!monitordata.highlight_1){
  return res.send({success:false,status:400,message:"please enter highlight ponits"})
 }
 

else{
  monitordata.statusId=1;
        monitordata.creationDate= new Date;
  var jointdata = "";
  for (let key of image) {
    jointdata = jointdata + key.filename + ",";
  }

  var data = jointdata;
  monitordata.statusId=1;
  monitordata.creationDate= new Date;
  Monitor.addmonitor(data, monitordata, function (err, result) {
    if(err){
      res.send({status:400,success:false, message:"someting went wrong",data:err})
  }
  else{
          res.send({status:200,success:true,message:"monitor inserting sucessfully",data:monitordata})
      } 
    
  });
}
};

//////////////////////////////////////////////////////


exports.updatemonitor = (req, res) => {
  var image = req.files;
  var mousedata = new K_mouse(req.body);
  
  mousedata.modifiedById=1;
  mousedata.modificationDate= new Date;

  var jointdata = ",";
  for (let key of image) {
    jointdata = jointdata + key.filename + ",";
  }
  var data = jointdata;
  Monitor.updateMonitor(req.params.monitor_id,mousedata,data,
    function (err, result) {
      if(err){
        res.send({status:400,success:false,message:"something went wrong"});

    }
    else if(result.length==0){ 

        res.send({status:200,success:true,message:"No Detail Available"});

    } 
    else{
    
        res.send({status:200,success:true,message:"result updated", data:result});
        
    }
    }
  );
};
