const Product = require("../Model/productModel.js");
const productModel = require("../Model/productmodel.js");

//
exports.getproductlist = (req, res) => {
  console.log("here are the all employees list");
  //    this.product_image=req.file.path;
  Product.getAllproduct((err, product) => {
    console.log("we are here it call me again and i wroking");
    if (err) res.send(err);
    console.log("product", product);
    res.send(product);
  });
};

///
exports.productlogin = (req, res) => {
  console.log("productmodel");
  console.log("req.body", req.body);
  var productdata = new productModel(req.body);
  productdata.product_image = req.file.path;
  // console.log(req.file.path);
  productdata.status_Id = 1;
  productdata.creation_Date = new Date();
  productModel.createProduct(productdata, (err, productdata) => {
    if (err) {
      res.send({
        status: 400,
        success: false,
        message: "something went wrong",
      });
    } else {
      res.send({ status: 200, success: true, message: "image uploaded" });
    }
  });
};

exports.getEmployeeByID = (req, res) => {
  console.log("get employee by id is here you get employee ");
  var productId = req.params.product_id;
  productModel.getEmployeeById(productId, (err, employee) => {
    if (err) res.send(err);
    console.log("single employee data is here = ", employee);
    res.send(employee);
  });
};

exports.deleteproductbyid = function (req, res) {
  var product_id = req.params.product_id;
  productModel.deleteproduct(product_id, function (err, product) {
    if (err) {
      res.send({
        status: 400,
        success: false,
        message: "error while fetching product",
      });
    } else {
      res.send({
        status: 200,
        success: true,
        message: "product deleted successfully",
      });
    }
  });
};

exports.updateProduct = (req, res) => {
  var productdata = new productModel(req.body);
  productdata.product_image = req.file.path;
  productdata.product_id = req.body.product_id;
  productdata.status_Id = 1;
  productdata.creation_Date = new Date();
  console.log(req.body);
  var productId = req.params.product_id;

  productModel.updateproduct(
    req.params.product_id,
    productdata,
    (err, productdata) => {
      if (err) {
        res.send({
          status: 400,
          success: false,
          message: "something went wrong",
        });
      } else {
        // console.log(req.body.path);
        // console.log(req.body);
        // console.log(productdata);
        return res.status(201).json(productdata);
      }
    }
  );
};
