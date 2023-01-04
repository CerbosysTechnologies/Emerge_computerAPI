const mysql=require('mysql')
var pool = mysql.createPool({
    connectionLimit : 100, //important    
    host     : 'localhost',
    port     :  3306,
    user     : 'root',
    password : 'root',
    database : 'emergedb',
    // debug    :  false,
    // insecureAuth : true

}); 


pool.getConnection(function (err, connection)  {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.')
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.')
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.' + err)
    }
  }

  if (connection){
    console.log("connected")
    connection.release();
    return;
  }
})
module.exports = pool;