var pool = require("../../dbconnection/config.js");
var Color = function (color) {
  this.s_no = color.S_no;
  this.Color_id = color.Color_id;
  this.Color_Name = color.Color_Name;
  this.status = color.status;
  this.statusId = color.statusId;
  this.createdById = color.createdById;
  this.creationDate = color.creationDate;
  this.modifiedById = color.modifiedById;
  this.modificationDate = color.modificationDate;
};
//get for
Color.getColor = (result) => {
  pool.query("select * from color", (err, res) => {
    if (err) {
      console.log("error while fetching Color", err);
      result(null, err);
    } else {
      console.log("Color fetched successfully");
      result(null, res);
    }
  });
};
// add new Color;
Color.addNewColor = (ColorData, result) => {
  pool.query("INSERT INTO color SET ?", ColorData, (err, res) => {
    if (err) {
      console.log("Error while inserting data");
      result(null, err);
    } else {
      console.log("Color inserted");
      result(null, res);
    }
  });
};

//get COlorbyid
Color.getColoridModel = function (Color_id, result) {
  pool.query(
    "SELECT * FROM color WHERE Color_id=?",
    [Color_id],
    function (err, res) {
      if (err) {
        console.log("error while fetching color by s_no", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};
//color delete
Color.deleteColor = function (s_no, result) {
  pool.query(
    "delete from color where s_no=?",
    [s_no],
    function (err, res) {
      if (err) {
        console.log("error while deleting data");
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

Color.updateColorM = function (s_no, colorData, result) {
  pool.query(
    "update color set Color_id=?,Color_Name=?,status=?,statusId=?,createdById=?,creationDate=?,modifiedById=?,modificationDate=? where s_no=?",
    [
      colorData.Color_id,
      colorData.Color_Name,
      colorData.status,
      colorData.statusId,
      colorData.createdById,
      colorData.creationDate,
      colorData.modifiedById,
      colorData.modificationDate,
      s_no,
    ],
    function (err, res) {
      if (err) {
        console.log("Error While Updating Color");
        result(null, err);
      } else {
        console.log("Color Updated");
        result(null, res);
      }
    }
  );
};

module.exports = Color;
