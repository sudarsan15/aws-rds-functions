var mysql = require('mysql');
require('dotenv').config();


//Connectivity using pools
var pool = mysql.createPool({
  connectionLimit : process.env.RDS_CONNECTION_LIMIT ,
  host     : process.env.RDS_HOSTNAME  ,
  port 	   : process.env.RDS_PORT ,
  user     : process.env.RDS_USERNAME ,
  password : process.env.RDS_PASSWORD ,
  database : process.env.RDS_DATABASE ,
});
 

//Adding a connection  
exports.connectDB = function () {
	return new Promise((resolve, reject) => {
		pool.getConnection(async (err, connection) => {
			if (err) {
				console.error('error connecting: ' + err.stack);
				reject(null);
			} else{
				console.log('connected as id ' + connection.threadId);	
				resolve(connection);
			}	

		});
	});
} 

// Releasing a connection
exports.closeDB =  (connection) => {
	connection.release();
}
