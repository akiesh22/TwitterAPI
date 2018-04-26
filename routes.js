'use strict'

var express = require('express');
var router = express.Router();
var path    = require("path");
var qs = require('querystring');//to get data from body/form


var Twit = require('twit');//Dependancy
var config = require('./config')//Configurations for oAuth
var T = new Twit(config); //Asingning configurations

//Home Get Request
router.get("/home", function(req, res){
	
		res.sendFile(path.join(__dirname+'/views/home.html'));

});

//Search
var params = {count: 5, lang:'en'}
router.get("/search",function(req, res){
	if (req.query.q) {
		params.q = req.query.q;
		params.result_type = 'mixed';	
	}
	if(req.query.max_id){
		params.max_id = req.query.max_id;
	}
	if(req.query.result_type){
		console.log(req.query.result_type);
		params.result_type = req.query.result_type;
	}
	T.get('search/tweets',params, function(err, data, response){
		res.json({ tweets: data.statuses });
	});
});

//Login page GET
router.get("/login", function(req, res){
	
		res.sendFile(path.join(__dirname+'/views/login.html'));

});

//Login POST
router.post("/login", function(req, res){
	if(req.body.username==="ganesh" && req.body.password==="ganesh123"){
	res.send({redirectUrl : "/home"});
	}else{
	res.json({msg : "Invalid credentials !" });
   }
});

module.exports = router;//Export this module