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
  adminModel.adminloginm(admindata, (err, admin) => {
    if (err) {
      res.send({
        status: 401,
        success: false,
        message: "Something Went Worng.",
      });
    } else {
      console.log("The solution is: ", admin);
      console.log("Length", admin.length);
      if (admin.length == 0) {
        return res.json({
          status: 401,
          success: false,
          message: "Email Does Not Exists. ",
        });
      } else if (admin.length > 0) {
        var token = "";
        var secretoKey = "";
        secretoKey = {type: 'admin',ad_id:admin[0].ad_id, email:admin[0].email};
        token = jwt.sign(secretoKey, "emergecomputer");
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

  

