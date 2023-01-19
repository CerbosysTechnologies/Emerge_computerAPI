const Laptop = require('../Model/laptop.model.js')

exports.laptopdetails=(req,res)=>{
    var laptopdata = new Laptop(req.body)
    var image = req.files
    // console.log(laptopdata,"controllerrrrrr check only");
    // console.log(image);
 
var jointdata= ""
for (let key of image)
{
jointdata = jointdata+key.filename+",";

}
var data = jointdata


Laptop.addlaptop(data,laptopdata,function(err,result){
  if (err) throw err
  else{
  return res.status(201).json(result)
  }
}) 

}  
//...................get all laptop list.......................//
exports.getlaptoplist = (req, res) => {
    console.log("here are the all laptops list");
    //    this.product_image=req.file.path;
    Laptop.getAlllaptop((err, laptop) => {
      if(err){
        res.send({status:400, success:false, message:"error while fetching laptop", data:err})
    }
    else{
        res.send({status:200,success:true,message:"laptop details fetched successfully",data:laptop });
    }
     
      
    });
  };
  ///////////////////////////////////////////////////////////////

  //...................................get all laptop  by id..............//
exports.getlaptopByID = (req, res) => {
    console.log("get laptop by id is here you get laptop ");
   Laptop.getlaptopById(req.params.laptop_id, (err, laptop) => {
      if (err) res.send(err);
      console.log("single laptop data is here = ", laptop);
      res.send(laptop);
    });
  };
  
  /////////////////////////////////////////////////////

  ///////////////////////////////////////////////////
exports.updatelaptop = (req, res) => {
     //console.log(laptopdata,"controllerrrrrr check only");
     console.log(req.files);
    
    var laptopdata = new Laptop(req.body);
  
    var jointdata = ",";
    var image = req.files;
    for (let key of image) {
      jointdata = jointdata + key.filename + ",";
    }
    var data = jointdata;
    Laptop.updatelaptop(
      req.params.laptop_id,
      laptopdata,
      data,
      function (err, result) {
        if (err) {
          res.send({
            status: 400,
            success: false,
            message: "something went wrong",
          });
        } else {
          return res.status(201).json(result);
        }
      }
    );
  };
  