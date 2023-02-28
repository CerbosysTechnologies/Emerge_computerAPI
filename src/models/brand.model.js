const mysql = require("mysql");
const pool = require("../../authorization/config");

//Constructor
const Brand = function (brand, file) {
  this.brand_id = brand.brand_id;
  this.brand_name = brand.brand_name;
  this.brand_image = file;
  this.statusId = brand.statusId;
  this.createdById = brand.createdById;
  this.creationDate = brand.creationDate;
  this.modificationDate = brand.modificationDate;
  this.modifiedById = brand.modifiedById;
};

//Add Brand
Brand.addBrand = function (brand, result) {
  pool.query(
    `select brand_name from brand where brand_name ='${brand.brand_name}'`,
    function (err, res) {
      if (err) {
        console.log(err);
      } else {
        try {
          if (res.length != 0) {
            result(err, {
              status: 400,
              success: false,
              message: "Brand is Already Saved.",
            });
          } else {
            pool.query("INSERT INTO brand SET ?", brand, function (err, res) {
              if (err) {
                result(err, null);
              } else {
                result(null, {
                  status: 200,
                  success: true,
                  message: "Details Saved Successfully.",
                });
              }
            });
          }
        } catch (e) {
          console.log(e);
        }
      }
    }
  );
};


Brand.updateBrandM = function (id, brand, result) {
  pool.query(
    `select brand_name from brand where brand_name ='${brand.brand_name}'`,
    function (err, res) {
      if (err) {
        console.log(err);
      } else {
        try {
          if (res.length != 0) {
            result(err, {
              status: 400,
              success: false,
              message: "Brand is Already Saved.",
            });
          } else {
            var update_query, value;
            pool.query(
              `select * from brand where brand_id=${id}`,
              function (err, data) {
                if (err) {
                  console.log(err);
                  result(err, null);
                } else {
                  console.log(data.length);
                  if (data.length > 0) {
                    if (brand.brand_image !== undefined) {
                      update_query = `update brand SET brand_name=?, brand_image=?, modifiedById=?, 
                        modificationDate=? where brand_id=?`;

                      value = [
                        brand.brand_name,
                        brand.brand_image,
                        brand.modifiedById,
                        brand.modificationDate,
                        id,
                      ];
                    } else {
                      update_query = `update brand SET brand_name=?, modifiedById=?, 
                        modificationDate=? where brand_id=?`;

                      value = [
                        brand.brand_name,
                        brand.modifiedById,
                        brand.modificationDate,
                        id,
                      ];
                    }
                    pool.query(update_query, value, function (err, res) {
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
                    });
                  }
                }
              }
            );
          }
        } catch (e) {
          console.log(e);
        }
      }
    }
  );
};

//Get All Brand
Brand.getAllBrand = function (result) {
  pool.query(
    "select * from brand where statusId=1  order by brand_id desc",
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

//GET Brand BYID
Brand.getBrandByIdM = function (brand_id, result) {
  pool.query(
    `select * from brand Where statusId=1 and brand_id=?`,
    [brand_id],
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

// get Brand By Name
Brand.getBrandByName = function (brand_name, result) {
  pool.query(
    `select * from brand Where statusId=1 and brand_name=?`,
    [brand_name],
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

module.exports = Brand;
