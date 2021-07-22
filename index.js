
// index.js
const myConfig = require('./initData');

// mongoose
//import mongoose from "./lib/mongoose";
const mongoose = require('./lib/mongoose');
mongoose.run(myConfig.mongodbRoute);

// express
//import express from "./lib/express";
const express = require('express');
const PORT = myConfig.PORT || 3000

//import cors from "cors";

//import cookieParser from 'cookie-parser';
const cookieParser = require('cookie-parser');
const session = require('express-session');

const { isAuthenticated, allowCORS } = require('./lib/middleware/express-authentication');

const manageUsers = require('./lib/middleware/manage-users');

const moviesApi = require('./lib/movies');

const app = express();

console.log('Init Server');

//app.use(cors());
// Allow CORS after the decleration
app.use(allowCORS);


app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

// Using that setup we can create sessions with req.session
app.use(cookieParser());


app.use(session({
	secret: myConfig.accessTokenSecret,
	resave: false,
	//saveUninitialized: false,
	saveUninitialized: true,
}));


manageUsers.run(app);


// Home url
app.get("/", (req, res) => {
	// api result
	//res.json({message: "Notetaking API v1"});
	res.redirect('/index.html');

});

// app.use(express.static("public/ftp", {"index": ["default.html", "default.htm"]}))
app.use(express.static("ClientApp/dist"));

app.get('/getSingle', async function(req, res)  {
	try {
		//var id = req.param('id');
		//var id = req.param.id; 
		var id = req.query.id; 
		console.log('movie/deleteMovie', id);
		

		res.send({ param: req.param, query: req.query });
	}
	catch (err) {
		res.send(err);
	}

});

app.get('/protected', isAuthenticated, (req, res) => {
	res.send({ message: 'This is private area', user: req.user });
});

moviesApi.run(app);

// use
app.listen(PORT, () => {
	console.log(`Server is listening on PORT ${PORT}
load http://127.0.0.1:${PORT}/ OR http://localhost:${PORT}/ 
in a browser to see the output`);
});

