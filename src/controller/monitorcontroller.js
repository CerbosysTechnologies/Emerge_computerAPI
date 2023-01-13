const Monitor = require("../Model/monitor.model.js");
const monitor = require("../Model/monitor.model.js");




exports.getmonitorlist=(req,res)=>{
  console.log("here are the all monitors list");
//    this.product_image=req.file.path;
Monitor.getAllMonitor((err,product)=>{
      console.log("we are here it call me again and i wroking");
      if(err)
      res.send(err)
      console.log('product',product);
      res.send(product)
  
  })
}
//////////////

exports.getmonitorByID=(req,res)=>{
  console.log("get monitor by id is here you get monitor ");
  Monitor.getmonitorById(req.params.monitor_id,(err,monitor)=>{
  if(err)
  res.send(err)
  console.log('single monitor data is here = ',monitor);
  res.send(monitor)

})
}


//////////////////
exports.monitordetails = (req,res) => {
  console.log(req.body);
  console.log(req.files);
  var monitordata= new monitor(req.body)
    if (req.files["image_1"])
    monitordata["image_1"] = req.files["image_1"][0].filename;
//console.log(monitordata["image_1"])
    if (req.files["image_2"])
        monitordata["image_2"] = req.files["image_2"][0].filename;
        //console.log(monitordata["image_2"])
   if (req.files["image_3"])
        monitordata["image_3"] = req.files["image_3"][0].filename;
        //console.log(monitordata["image_3"])
  if (req.files["image_4"])
        monitordata["image_4"] = req.files["image_4"][0].filename;
  //monitordata.status_Id = 4;
  monitordata.creation_Date = new Date();
  console.log(monitordata,"hemant22222222222");
  Monitor.addmonitor(monitordata, (err, monitordata) => {
    if (err) {
      console.log(err,"cheking is here hemant");
      res.send({
        
        status: 400,success: false,message: "something went wrong",
      });
    } else {
      console.log(monitordata,"hemant22222222222");
      res.send({ status: 200, success: true, message: "image uploaded" });
    }
  });
};
