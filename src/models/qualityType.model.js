const mysql = require("mysql");
const pool = require("../../authorization/config");
const QualityType = function (qualitytype) {
  this.quality_type_id = qualitytype.quality_type_id;
  this.quality_type_name = qualitytype.quality_type_name;
  // this.quality_type= qualitytype.quality_type;
  this.status = qualitytype.status;
  this.createdById = qualitytype.createdById;
  this.creationDate = qualitytype.creationDate;
  this.modificationDate = qualitytype.modificationDate;
  this.modifiedById = qualitytype.modifiedById;
};
QualityType.insertQualityTypeM = function (qt, result) {
  pool.query("INSERT INTO quality_type SET ?", qt, function (err, res) {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, {
        status: 200,
        success: true,
        message: "Details Saved Successfully.",
      });
    }
  });
};

//Get All QualityType
QualityType.getAllQualityTypeM = function (result) {
  pool.query(
    "select * from quality_type where status=1  order by quality_type_id desc",
    function (err, res) {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

//Get Quality Type ById
QualityType.getQualityTypeById = function (quality_type_id, result) {
  pool.query(
    `select * from quality_type Where status=1 and quality_type_id=?`,
    [quality_type_id],
    function (err, res) {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

//Update Quality Type
QualityType.updateQualityType = function (quality_type_id, qt, result) {
  pool.query(
    "update quality_type SET quality_type_name=?, modifiedById=?, modificationDate=? where quality_type_id=?",
    [
      qt.quality_type_name,
      //   qt.quality_type,
      qt.modifiedById,
      qt.modificationDate,
      quality_type_id,
    ],
    function (err, res) {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, {
          status: 200,
          success: true,
          message: "Details Updated Successfully.",
        });
      }
    }
  );
};

module.exports = QualityType;
