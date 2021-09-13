var http = require("http");
var express = require('express');
var app = express();
var mysql      = require('mysql');
var bodyParser = require('body-parser');

//start mysql connection
var connection = mysql.createConnection({
  host     : 'db4free.net', //mysql database host name
  user     : 'nadeemproff', //mysql database user name
  password : 'Abdul@2016', //mysql database password
  database : 'nadeemproffdb' //mysql database name
});

connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected with mysql database...')
})
//end mysql connection

//start body-parser configuration
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
//end body-parser configuration

//create app server
var server = app.listen(3000,  "127.0.0.1", function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

});

//rest api to get all customers
app.get('/Student', function (req, res) {
   connection.query('select * from Student', function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});
//rest api to get a single customer data
app.get('/Student/:id', function (req, res) {
   connection.query('select * from Student where Id=?', [req.params.id], function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

//rest api to create a new customer record into mysql database
app.post('/Student', function (req, res) {
   var params  = req.body;
   console.log(params);
   connection.query('INSERT INTO Student SET ?', params, function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

//rest api to update record into mysql database
app.put('/Student', function (req, res) {
   connection.query('UPDATE `Student` SET `firstName`=?,`lastName`=?,`class`=?,`nationality`=? where `id`=?', [req.body.firstName,req.body.lastName, req.body.class, req.body.nationality, req.body.id], function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

//rest api to delete record from mysql database
app.delete('/Student', function (req, res) {
   console.log(req.body);
   connection.query('DELETE FROM `Student` WHERE `id`=?', [req.body.id], function (error, results, fields) {
	  if (error) throw error;
	  res.end('Record has been deleted!');
	});
});