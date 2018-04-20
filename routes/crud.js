/*

Author Name  : Sudarsan PS 
website      : www.sudarsanps.com
Description  : This is the route for CRUD functionalities which are performed on AWS RDS

*/

var express = require('express');
var router = express.Router();
var connection = null;

require('../shared/shared');

/*
  View Section  - This route will help you to  fetch details from customer table  

*/
router.route('/')
	.get(async(req,res,next)=>{
		connection = await config.connectDB();
		if(connection.state != 'disconnected' ){
			var sqlQuery = "SELECT * FROM customers";
			connection.query(sqlQuery, function (error, results,fields) {
				console.log("error:"+error);
				console.log("results:"+results);
				console.log("fields:"+fields);
				if(error){
					console.log("error:"+JSON.stringify(error));

					req.flash('error',error.sqlMessage );
					res.render('crud/view', { title: 'Table - view', success  : req.flash('success',''),error: req.flash('error',''), csrfToken: req.csrfToken(), results : results });
					
				}
				else{
					config.closeDB(connection);
					console.log("results:"+JSON.stringify(results));
					
					res.render('crud/view', { title: 'Table - view', success  : req.flash('success',''),error: req.flash('error',''), csrfToken: req.csrfToken(), results : results });
				}
			});	
		}
		else{
			req.flash('error','error in database connection');
			res.redirect('crud/view');
		}
	});	

/*
  Insert Section  - This route perfomes insert function towards customer table

*/
router.route('/insert')
	.get(async(req,res,next)=>{
		connection = await config.connectDB();
		if(connection.state != 'disconnected' ){
			var sqlQuery = "SELECT * FROM customers";
			connection.query(sqlQuery, function (error, results,fields) {
				console.log("error:"+error);
				console.log("results:"+results);
				console.log("fields:"+fields);
				if(error){
					console.log("error:"+JSON.stringify(error));

					req.flash('error',error.sqlMessage );
					res.render('crud/insert', { title: 'Table - view', success  : req.flash('success',''),error: req.flash('error',''), csrfToken: req.csrfToken(), results : results });
					
				}
				else{
					config.closeDB(connection);
					console.log("results:"+JSON.stringify(results));
					console.log("fields:"+JSON.stringify(fields));

					res.render('crud/insert', { title: 'Table - view', success  : req.flash('success',''),error: req.flash('error',''), csrfToken: req.csrfToken() });
				}
			});	
		}
		else{
			req.flash('error','error in database connection');
			res.redirect('crud/view');
		}
	})
	.post(async(req,res,next)=>{

		var name = validator.trim(xss(striptags(req.body.name)));
		var address = validator.trim(xss(striptags(req.body.address)));
		var inputArray = [];

		console.log("name:"+name);
		console.log("address:"+address);

		inputArray.push(name);
		inputArray.push(address);

		if((name != "") && (name != null) && (address != "") && (address != null)){		
			connection = await config.connectDB();
			if(connection.state != 'disconnected' ){

				var sqlQuery = "INSERT INTO customers (name, address) VALUES (?,?)";

				connection.query(sqlQuery,inputArray, function (error, results, fields) {
					if (error) {

						req.flash('error',error.sqlMessage );
						res.redirect('/crud/insert');
					}
					else{
						config.closeDB(connection);
						console.log("results:"+JSON.stringify(results));
						console.log("fields:"+JSON.stringify(fields));

						req.flash('success',"Data successfully inserted");
						res.redirect('/crud/insert');
					}
				});
			}
			else{

				req.flash('error','error in database connection');
				res.redirect('crud/insert');
			}
		}
		else{

			req.flash('error',"All fields are mandatory");
			res.redirect('/crud/insert');
			
		}	  
	});	

/*
  Delete Section  - This performes delete operation from customer table

*/
router.route('/delete')
	.post(async(req,res,next)=>{

		connection = await config.connectDB();
		if(connection.state != 'disconnected' ){

			var id = validator.trim(xss(striptags(req.body.id)));	
			var inputArray = [];

			inputArray.push(id);
			
			if((id != null) && (id != '')){

				var sqlQuery = "DELETE FROM customers WHERE id = ?";
				connection.query(sqlQuery,inputArray, function (error, results, fields) {
					if (error) {

						req.flash('error',error.sqlMessage );
						res.redirect('/crud/');
					}
					else{
						config.closeDB(connection);
						console.log("results:"+JSON.stringify(results));
						console.log("fields:"+JSON.stringify(fields));

						req.flash('success',"Data successfully deleted");
						res.redirect('/crud/');
					}
				});
			}
			else{

				req.flash('error','Please select aleast one option for delete');
				res.redirect('/crud/');
			}	

		}	
		else{

			req.flash('error','error in database connection');
			res.redirect('/crud/');
		}		
	});	

/*
  Update View  - This executes when user is wants to update the details and it verifies before it allow to view the update option

*/
router.route('/update')
	
	.post(async(req,res,next)=>{

		connection = await config.connectDB();
		if(connection.state != 'disconnected' ){

			var id = validator.trim(xss(striptags(req.body.id)));	
			var inputArray = [];

			inputArray.push(id);
			
			if((id != null) && (id != '')){

				var sqlQuery = "SELECT * FROM customers WHERE  id = ?";
				connection.query(sqlQuery, inputArray ,function (error, results,fields) {

					if(error){

						console.log("error:"+JSON.stringify(error));

						req.flash('error',error.sqlMessage );
						res.redirect('/crud/');

					}
					else{

						config.closeDB(connection);
						if(results.length >0){
							req.flash('success','List is given below' );
							res.render('crud/update', { title: 'Table - update', success  : req.flash('success',''),error: req.flash('error',''), csrfToken: req.csrfToken(), results : results });

						}
						else{
							req.flash('error',"Couldn't find what you are looking for " );
							res.redirect('/crud/')
						}
					}
				});	
			}
			else{
				config.closeDB(connection);
				req.flash('error','Please select aleast one option for delete');
				res.redirect('/crud/');
			}	
		}	
		else{

			req.flash('error','error in database connection');
			res.redirect('/crud/');
		}		
	});

/*
  Update Action  - Once the user submits for updation, this section is excuted

*/
router.route('/updateaction')
	.post(async(req,res,next)=>{

		connection = await config.connectDB();
		if(connection.state != 'disconnected' ){

			var name = validator.trim(xss(striptags(req.body.name)));
			var address = validator.trim(xss(striptags(req.body.address)));
			var id = validator.trim(xss(striptags(req.body.id)));
			var inputArray = [];

			console.log("name:"+name);
			console.log("address:"+address);
			console.log("id:"+id);

			inputArray.push(name);
			inputArray.push(address);
			inputArray.push(id);

			if((name !="") && (name != null) && (address !="") && (address != null) && (id !="") && (id != null)){

				var sqlQuery = "UPDATE customers SET name= ?, address = ?  WHERE id = ?";

				connection.query(sqlQuery, inputArray ,function (error, results,fields) {

					if(error){

						console.log("error:"+JSON.stringify(error));

						req.flash('error',error.sqlMessage );
						res.redirect('/crud/')

					}
					else{

						if(results.affectedRows >0){

							req.flash('success','Table has been successfully updated' );
							res.redirect('/crud/')

						}
						else{

							req.flash('error','Seems like nothing got updated.Please try after sometime' );
							res.redirect('/crud/')
						}
					}
				});	
			}
			else{

				req.flash('error','All fields are mandatory for updation');
				res.redirect('/crud/');
			}
		}
		else{

			req.flash('error','error in database connection');
			res.redirect('/crud/');
		}
	});		


module.exports = router;	