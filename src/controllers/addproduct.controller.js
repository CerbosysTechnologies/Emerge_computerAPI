 const Product = require('../models/addproduct.model.js')
const productModel = require('../models/addproduct.model')


exports.productadd = (req, res) => {
    // console.log("productmodel");
    console.log("req.body", req.body);
    var productdata = new productModel(req.body);
    productdata.product_image = req.file.path;
    // console.log(req.file.path);
    productdata.status_Id = 1;
    productdata.creation_Date = new Date();
    Product.createProduct(productdata, (err, productdata) => {
      if (err) {
        res.send({
          status: 400,success: false,message: "something went wrong",
        });
      } else {
        res.send({ status: 200, success: true, message: "image uploaded" ,data:productdata });
      }
    });
  };