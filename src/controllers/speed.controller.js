const passport = require("passport");
const speedModel = require("../models/speed.model");
require("../../authorization/passport")(passport);

module.exports.insertSpeed = function (req, res, next) {
  passport.authenticate("jwt", function (err, admin) {
    console.log("IS Next", admin);
    if (err || !admin) {
      console.log("admin", err);
      return res.json({
        status: 401,
        success: false,
        message: "Authentication Fail.",
      });
    } else if (admin) {
      var speed = new speedModel(req.body);
      if (!speed.speed_name) {
        return res
          .status(400)
          .send({ error: true, message: "Please Speed Name Details." });
      }

      speed.status = 1;
      speed.createdById = admin[0].ad_id;
      speed.creationDate = new Date();

      speedModel.insertSpeedM(speed, function (err, data) {
        if (err) {
          res.send({
            status: 400,
            success: false,
            message: "Details not saved.",
          });
        } else {
          res.send({ status: 200, success: true, message: data.message });
        }
      });
    }
  })(req, res, next);
};

// Get All Speed
module.exports.getAllSpeed = function (req, res, next) {
  // passport.authenticate('jwt',function(err,admin)
  // {
  //     if (err || !admin)
  //     {
  //         return res.json({ status: 401, success: false, message: "Authentication Fail." });
  //     }
  //     else if(admin){
  speedModel.getAllSpeedM(function (err, data) {
    if (err) {
      res.send({
        status: 400,
        success: false,
        message: "No Speed Details Found",
      });
    } else if (data.length == 0) {
      res.send({
        status: 200,
        success: true,
        message: "No Speed Details Available",
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
};
//   })(req,res,next)
// }

// Get Speed ById
module.exports.getSpeedById = function (req, res, next) {
  passport.authenticate("jwt", function (err, admin) {
    if (err || !admin) {
      return res.json({
        status: 401,
        success: false,
        message: "Authentication Fail.",
      });
    } else if (admin) {
      speedModel.getSpeedByIdM(req.params.speed_id, function (err, data) {
        if (err) {
          res.send({ status: 400, success: false, message: "No Detail Found" });
        } else if (data.length == 0) {
          res.send({
            status: 200,
            success: true,
            message: "No Detail Available",
          });
        } else {
          res.send({
            status: 200,
            success: true,
            message: "Detail Found",
            data: data,
          });
        }
      });
    }
  })(req, res, next);
};

module.exports.updateSpeed = function (req, res, next) {
  passport.authenticate("jwt", function (err, admin) {
    if (err || !admin) {
      return res.json({
        status: 401,
        success: false,
        message: "Authentication Fail.",
      });
    } else if (admin) {
      var speed = new speedModel(req.body);

      speed.modifiedById = admin[0].ad_id;
      speed.modificationDate = new Date();
      speedModel.updateSpeedM(req.params.speed_id, speed, function (err, data) {
        if (err) {
          res.send({
            status: 400,
            success: false,
            message: "Details Not Saved.",
          });
        } else {
          res.send({ status: 200, success: true, message: data.message });
        }
      });
    }
  })(req, res, next);
};
