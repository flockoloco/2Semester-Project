const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'All_Aboard',
    password: 'root'
  });

  connection.connect((err)=>{   
    if (err){
        console.log(err);
    };
    console.log('Database: "All Aboard" has been conected! ')
  });

  module.exports = connection;