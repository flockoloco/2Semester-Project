const util = require('util')
const mysql = require('mysql2');

// connection to the database
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'belivers',
    password: 'root'
  });

// get the connection
pool.getConnection((err, connection) => {
  if(err)
  {
    console.log("Something went wrong connection to the DataBase");
  }

  if(connection)
  {
    console.log("Connected to the DataBase");
    connection.release();
  }

  return;
});

pool.query = util.promisify(pool.query);

module.exports = pool;