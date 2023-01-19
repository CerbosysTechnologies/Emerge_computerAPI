const pool = require("../../dbconnection/config");

var Laptop = function (Laptop, files) {
  this.Laptop_id = Laptop.laptop_id;
  Laptop.image = files;
  this.laptop_brand_name = Laptop.laptop_brand_name;
  this.laptop_buy_at = Laptop.laptop_buy_at;
  this.laptop_rent_at = Laptop.laptop_rent_at;
  this.description = Laptop.description;
  this.highlight_1 = Laptop.highlight_1;
  this.status_id = Laptop.status_id;
  this.createdById = Laptop.createdById;
  this.creation_Date = Laptop.creation_Date;
  this.modifiedById = Laptop.modifiedById;
  this.modificationDate = Laptop.modificationDate;
};

Laptop.addlaptop = function (data, laptopdata, result) {
  let image = data;
  console.log(image);
  pool.query(
    `insert into laptop set laptop_brand_name='${laptopdata.laptop_brand_name}',laptop_buy_at='${laptopdata.laptop_buy_at}',description='${laptopdata.description}',highlight_1='${laptopdata.highlight_1}',laptop_rent_at='${laptopdata.laptop_rent_at}',image='${data}'`,
    function (err, res) {
      // console.log(laptopdata,"controllerrrrrr check only");
      if (err) result(null, err);
      else result(null, res);
    }
  );
};
//..............................get all laptop details...........................................................

Laptop.getAlllaptop = (result) => {
  pool.query("SELECT * FROM laptop", (err, res) => {
    if (err) {
      console.log("err is occure while fetching data", err);
      result(null, err);
    } else {
      console.log("employee fetching sucessfully");
      result(null, res);
    }
  });
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////
//..............................get all laptop by id..................

Laptop.getlaptopById = (laptop_id, result) => {
  pool.query(
    "SELECT * FROM laptop WHERE laptop_id=?",
    [laptop_id],
    (err, res) => {
      if (err) {
        console.log("error while fetching the laptop by id", err);
        result(err, null);
      } else {
        console.log("respons ", res);
        result(null, res);
      }
    }
  );
};
///////////////////////////////////////////////////////////////////////////////////
//........................................update laptop details........................

Laptop.updatelaptop = (id, laptopdata, data, result) => {
  pool.query(
    "update laptop set laptop_brand_name=?,laptop_buy_at=?,description=?,highlight_1=?,laptop_rent_at=?,image=? where laptop_id=?",
    (value = [
      laptopdata.laptop_brand_name,
      laptopdata.laptop_buy_at,
      laptopdata.description,
      laptopdata.highlight_1,
      laptopdata.laptop_rent_at,
      data,
      id,
    ]),
    function (err, res) {
      if (err) result(null, err);
      else result(null, res);
    }
  );
};



module.exports = Laptop;
