const jwt = require("jsonwebtoken");
const adminModel = require("../models/admin.model");

exports.adminlogin = function (req, res) {
  var admindata = new adminModel(req.body);
  if (!admindata.email) {
    return res.send({
      success: false,
      status: 401,
      message: "please fill Email ",
    });
  }
  adminModel.adminlogin(admindata, (err, data) => {
    if (err) {
      res.send({
        status: 401,
        success: false,
        message: "Something Went Worng.",
      });
    } else {
      console.log("The solution is: ", data);
      console.log("Length", data.length);
      if (data.length == 0) {
        return res.json({
          status: 401,
          success: false,
          message: "Username Does Not Exists.",
        });
      } else if (data.length > 0) {
        var token = "";
        var secret = "";
        secret = { type: "admin", adminModel: adminModel.email,ad_id:adminModel.ad_id };
        token = jwt.sign(secret, "emergecomputer");

        res.send({
          status: 200,
          success: true,
          message: "Login Successful",
          token: token,
        });
      }
    }
  });
};

  