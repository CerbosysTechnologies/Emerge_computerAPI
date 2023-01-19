const K_mouse =require('../Model/k_mouse.model.js')


/////////////////////////////////////////////////////

//.......................................................
exports.k_mousedetails = (req, res) => {
    var mousedata = new K_mouse(req.body);
    console.log(mousedata);
    var image = req.files;
    if(!mousedata.id){
      return res.send({success:false, status:400, message:"please fill keyboard  id "})
  }
  
  else if(!mousedata.k_mouse_brand_name){
   return res.send({success:false,status:400,message:"please fill keyboard and mouse brand name"})
  }
  else if(!mousedata.k_mouse_buy_at){
    return res.send({success:false,status:400,message:"please enter buy prize"})
   }
   else if(!mousedata.description){
    return res.send({success:false,status:400,message:"please enter description"})
   }
   else if(!mousedata.highlight_1){
    return res.send({success:false,status:400,message:"please enter highlight ponits"})
   }
   else{
    mousedata.statusId=1;
          mousedata.creationDate= new Date;
    var jointdata = "";
    for (let key of image) {
      jointdata = jointdata + key.filename + ",";
    }
  
    var data = jointdata;
    mousedata.statusId=1;
    mousedata.creationDate= new Date;
    K_mouse.addmouse(data, mousedata, function (err, result) {
      if(err){
        res.send({status:400,success:false, message:"someting went wrong",data:err})
    }
    else{
            res.send({status:200,success:true,message:"detals of mouse and keyboard inserting sucessfully",data:mousedata})
        } 
      
    });
  }
  };
  
  ///////////////////////////////
//................................get  all mouse and keyboard details here................
  exports.getmouselist = (req, res) => {
    console.log("here are the all mouse and keyboard list");
     K_mouse.getALLmouse((err, mouse) => {
      if(err){
        res.send({status:400, success:false, message:"error while fetching mouse", data:err})
    }
    else{
        res.send({status:200,success:true,message:"mouse details fetched successfully",data:mouse });
    }
      
      });
  };
  
//...................................get mouse and keyboard  by id..............//
exports.getmouseByID = (req, res) => {
    console.log("get mouse and keyborad by id is here  ");
    K_mouse.getmouseById(req.params.id, (err, mouse) => {
      if(err){
        res.send({status:400,success:false,message:'error while fetching mouse details'});
    }
    else
    {
      res.send({status:200,success:true,data:mouse, message:"mouse details fetched successfully"});
    }
  
    });
  };
  
  /////////////////////////////////////////////////////

  exports.updatemouse = (req, res) => {
    var image = req.files;
    var mousedata = new K_mouse(req.body);
    
    mousedata.modifiedById=1;
    mousedata.modificationDate= new Date;
  
    var jointdata = ",";
    for (let key of image) {
      jointdata = jointdata + key.filename + ",";
    }
    var data = jointdata;
    K_mouse.updateMouse(req.params.id,mousedata,data,
      function (err, result) {
        if(err){
          res.send({status:400,success:false,message:"something went wrong"});
  
      }
      else if(result.length==0){ 
  
          res.send({status:200,success:true,message:"No Detail Available"});
  
      } 
      else{
      
          res.send({status:200,success:true,message:"result updated", data:mousedata});
          
      }
      }
    );
  };
  
  