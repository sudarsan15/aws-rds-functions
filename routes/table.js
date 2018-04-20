/*

Author Name  : Sudarsan PS 
Description  : This is for MYSQL functionalites for AWS RDS
Date         : 18 April 2018
*/

var express = require('express');
var router = express.Router();
var connection = null;

require('../shared/shared');

// GET and POST method of create table
router.route('/')
	.get(function(req,res,next){
		res.render('table/create', { title: 'Express', success  : req.flash('success',''),error: req.flash('error',''), csrfToken: req.csrfToken(), });
	})
	.post(async(req,res,next)=>{
		connection = await config.connectDB();
		if(connection.state != 'disconnected' ){
			var sqlQuery = "CREATE TABLE customers (id INT primary key AUTO_INCREMENT,  name VARCHAR(255), address VARCHAR(255))";
			connection.query(sqlQuery, function (error, results) {
			  /* error -  will be an Error if one occurred during the query
			  	 results -> will contain the results of the query
			  	 fields will contain information about the returned results fields (if any)
			  */ 
			  	if(error){
			  		console.log("error:"+error);	
			  		req.flash('error', error.sqlMessage );
			  		res.redirect('/table/');
			  	}
			  	else{
					config.closeDB(connection);
					console.log("results:"+ JSON.stringify(results));	

					req.flash('success', 'Table has been created' );
					res.redirect('/table/');
			  	}

			});
		} else{
			// db.closeDB(connection);
			req.flash('error',"Error in connecting database!");
			res.redirect('/table/');
		}
	});

// GET and POST of drop table
router.route('/drop')
	.get(function(req,res,next){
		res.render('table/drop', { title: 'Express', success  : req.flash('success',''),error: req.flash('error',''), csrfToken: req.csrfToken(), });
	})
	.post(async(req,res,next)=>{
		connection = await config.connectDB();
		if(connection.state != 'disconnected'){
			var sqlQuery =  "DROP TABLE customers";
			connection.query(sqlQuery, function (error, results) {

			  	if(error){
			  		console.log("error:"+error);	
			  		req.flash('error', error.sqlMessage );
			  		res.redirect('/table/drop');
			  	}
			  	else{
					config.closeDB(connection);
					console.log("results:"+ JSON.stringify(results));	

					req.flash('success', 'Table dropped successfully' );
					res.redirect('/table/drop');
			  	}
			});

		}
		else{
			req.flash('error',"Error in connecting database!");
			res.redirect('/table/drop');
		}
	});

module.exports = router;
