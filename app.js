'use strict'

var express =  require('express');//Express dependancy
var app = express();//New instance
var routes = require('./routes')//Routes file

var bodyParser = require('body-parser'); //----------------------------\/
var logger = require('morgan');//Logs into console


app.use(logger('dev')); 
app.use(bodyParser.json());//This middleware parses the request into JSON so as to be accessible from request body property
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(express.static(__dirname + '/styles'));
app.use(express.static(__dirname + '/scripts'));
//Store all JS and CSS in Scripts folder.

app.use("/", routes); //Routing


//Error handling
app.use(function(req, re, next){
	var err = new Error("Not Found");
	err.status =  404;
	next(err);
});

//Error handler
app.use(function(err, req, res, next){
	res.status(err.status || 500);
		res.json({
		error:{
			message:err.message
		}
	});
});


//port listen
var port = process.env.PORT || 3000;
app.listen(port,function(){
	console.log(`Express server is listening, got to locahost:${port}\\login`);
});