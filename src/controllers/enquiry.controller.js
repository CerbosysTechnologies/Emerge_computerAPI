const enquiry = require("../models/enquiry.model.js");
const passport = require("passport");
require("../../authorization/passport")(passport);

//create new enquiry
exports.createNewEnquiry = (req, res) => {
  const enquiryReqdata = req.body;
  console.log("here is the data check at controller", enquiryReqdata);

  if (!enquiryReqdata.name) {
    return res.send({
      success: false,
      status: 400,
      message: "please fill name ",
    });
  } else if (!enquiryReqdata.mobile_number) {
    return res.send({
      success: false,
      status: 400,
      message: "please fill number ",
    });
  } else if (!enquiryReqdata.category) {
    return res.send({
      success: false,
      status: 400,
      message: "please select category ",
    });
  } else if (!enquiryReqdata.quantity) {
    return res.send({
      success: false,
      status: 400,
      message: "please select quantity ",
    });
  } else if (!enquiryReqdata.tenure) {
    return res.send({
      success: false,
      status: 400,
      message: "please select tenure ",
    });
  } else {
    enquiryReqdata.statusId = 1;
    enquiryReqdata.creationDate = new Date();
    enquiryReqdata.modificationDate = new Date();
    console.log("vaild data success");
    enquiry.createEnquiry(enquiryReqdata, (err, enquiry) => {
      if (err) res.send(err);
      res.json({ status: true, message: "created", data: enquiry });
    });
  }
};

module.exports.getAllEnquiry = function (req, res, next) {
  passport.authenticate("jwt", function (err, admin) {
    if (err || !admin) {
      return res.json({
        status: 401,
        success: false,
        message: "Authentication Fail.",
      });
    } else if (admin) {
      enquiry.getAllEnquiry(function (err, data) {
        if (err) {
          res.send({
            status: 400,
            success: false,
            message: "No Enquiry Details Found",
          });
        } else if (data.length == 0) {
          res.send({
            status: 200,
            success: true,
            message: "No Enquiry Details Available",
          });
        } else {
          res.send({
            status: 200,
            success: true,
            message: "Speed Details Found",
            data: data,
          });
        }
      });
    }
  })(req, res, next);
};

//  exports.getenquirylist=(req,res)=>{
//console.log("here are the all employees list");
// exports.getAllenquiry((err,enquiry)=>{
//         console.log("we are here it call me again and i wroking");
//         if(err)
//         res.send(err)
//         console.log('enquiry',enquiry);
//         res.send(enquiry)

//     })
// }
