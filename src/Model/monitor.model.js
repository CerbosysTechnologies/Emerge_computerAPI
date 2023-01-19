const pool = require("../../dbconnection/config.js");
var Monitor = function (Monitor, files) {
  this.monitor_id = Monitor.monitor_id;
  Monitor.image = files;
  this.monitor_name = Monitor.monitor_name;
  this.monitor_buy_at = Monitor.monitor_buy_at;
  this.monitor_rent_at = Monitor.monitor_rent_at;
  this.description = Monitor.description;
  this.highlight_1 = Monitor.highlight_1;
  this.status_id = Monitor.status_id;
  this.createdById = Monitor.createdById;
  this.creation_Date = Monitor.creation_Date;
  this.modifiedById = Monitor.modifiedById;
  this.modificationDate = Monitor.modificationDate;
};
//..............................get all monitor details...........................................................

Monitor.getAllMonitor = (result) => {
  pool.query("SELECT * FROM Monitor", (err, res) => {
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

//..............................get all monitor by di..................

Monitor.getmonitorById = (monitor_id, result) => {
  pool.query(
    "SELECT * FROM monitor WHERE monitor_id=?",
    [monitor_id],
    (err, res) => {
      if (err) {
        console.log("error while fetching the monitor by id", err);
        result(err, null);
      } else {
        console.log("respons ", res);
        result(null, res);
      }
    }
  );
};
///////////////////////////////////////////////////////////////////////////////////

//............................add new monitor details.........................................

Monitor.addmonitor = function (data, monitordata, result) {
  console.log(data);
  pool.query(
    `insert into monitor set monitor_id='${monitordata.monitor_id}',monitor_name='${monitordata.monitor_name}',monitor_buy_at='${monitordata.monitor_buy_at}',description='${monitordata.description}',highlight_1='${monitordata.highlight_1}',monitor_rent_at='${monitordata.monitor_rent_at}' ,image='${data}'`,
    function (err, res) {
      if (err) result(null, err);
      else result(null, res);
    }
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////

//........................................update monitor details........................

Monitor.updateMonitor = (id, monitordata, data, result) => {
  pool.query(
    "update monitor set monitor_name=?,monitor_buy_at=?,description=?,highlight_1=?,monitor_rent_at=?,image=? where monitor_id=?",
    (value = [
      monitordata.monitor_name,
      monitordata.monitor_buy_at,
      monitordata.description,
      monitordata.highlight_1,
      monitordata.monitor_rent_at,
      data,
      id,
    ]),
    function (err, res) {
      if (err) result(null, err);
      else result(null, res);
    }
  );
};

module.exports = Monitor;
