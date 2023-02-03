const mysql=require('mysql')
var pool = mysql.createPool({
    connectionLimit : 100, //important    
    host     : 'localhost',
    port     :  3306,
    user     : 'root',
    password : 'root',
    database : 'new_emergedb',
    // debug    :  false,
    // insecureAuth : true

}); 
pool.getConnection(function (err, connection)  {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database Connection Was Closed.')
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database Has Too Many Connections.')
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database Connection Was Refused.' + err)
    }
  }

  if (connection){
    console.log("Connected")
    connection.release();
    return;
  }
})
module.exports = pool;