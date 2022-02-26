
// index.js
async function run() {
	const myConfig = require('./initData');

	// mongoose
	//import mongoose from "./lib/mongoose";
	const { run, ObjectId } = require('./lib/mongoose');
	const mongoose = await run(myConfig.mongodbRoute);

	//.catch(reason => console.log('catch error in mongoose', reason))
	//.then(() => console.log('then in mongoose'));
	//.finally(() => console.log('finally in run function'));

	// express
	//import express from "./lib/express";
	const express = require('express');
	const PORT = myConfig.PORT || 3000


	//import cors from "cors";

	//import cookieParser from 'cookie-parser';
	const cookieParser = require('cookie-parser');
	const session = require('express-session');

	const { isAuthenticated, allowCORS } = require('./lib/middleware/express-authentication');

	//const manageUsers = require('./lib/middleware/manage-users');

	//const moviesApi = require('./lib/movies');

	const socketIO = require('socket.io')

	const http = require('http');

	//const chat = require('./lib/chat');

	const request = require('request');

	const userModule = require('mongoose-user-management');

	const axios = require('axios').default;

	const path = require('path');

	// 1)register 2)Autheticate 3)resetPassword
	const username = {
		_id: ObjectId("620709fc2006c10c1cab3d20"),
		username: "test",
		password: "12354"
	}
	// todo: 'invalid'
	const fake = {
		...username,
		email: "test@test.com",
		firstName: "Manish",
		lastName: "Ranjan",
		middleName: "mi",
		identificationNumber: "55555",
		phoneNumber1: "5555555",
		phoneNumber2: "ffffffffffff",
		address: {
			address1: "101 Metlife Way",
			address2: "Test way",
			zip: "27513",
			state: "NC",
			city: "Cary",
			country: "USA"
		}
	};

	//await userModule.register(fake);
	console.log('user Autheticate', await userModule.autheticate(username));

	// App
	console.log('Init express app');
	const app = express();


	console.log('app.use allowCORS');
	//app.use(cors());
	// Allow CORS after the decleration
	app.use(allowCORS);


	console.log('app.use express.json');
	app.use(express.json());
	//app.use(express.urlencoded({ extended: true }));

	console.log('app.use cookieParser');
	// Using that setup we can create sessions with req.session
	app.use(cookieParser());

	console.log('app.use session');
	app.use(session({
		secret: myConfig.accessTokenSecret,
		resave: false,
		//saveUninitialized: false,
		saveUninitialized: true,
	}));

	//console.log('manageUsers');
	/* manageUsers */
	//manageUsers.run(app);


	/* app  */

	console.log('app.use routes');
	// req.route
	const defaultRoute = {
		path: '/user/:id?',
		stack:
			[{
				// this 
				//handle: [Function: userIdHandler],
				handle: [],
				name: 'userIdHandler',
				params: undefined,
				path: undefined,
				keys: [],
				regexp: /^\/?$/i,
				method: 'get'
			}],
		methods: { get: true }
	};

	//app.use('/interpolation/*', express.static(path.join(__dirname, 'build'), { index: 'index.html' }));
	//app.use(express.static("public/ftp", {"index": ["default.html", "default.htm"]}))
	// http://127.0.0.1:3000/getSingle?id=5
	app.get('/getSingle1', async function (req, res) {
		try {
			//var id = req.param('id');
			//var id = req.param.id; 
			var query = req.query;

			console.log('getSingle', query);

			res.send({ query });
		}
		catch (err) {
			res.send(err);
		}

	});

	console.log('app.use static');
	var options = {
		dotfiles: 'ignore',
		etag: false,
		extensions: ['htm', 'html'],
		index: false,
		maxAge: '1d',
		redirect: false,
		setHeaders: function (res, path, stat) {
			res.set('x-timestamp', Date.now())
		}
	}

	//app.use(express.static('public', options))

	// app.use(express.static("public/ftp", {"index": ["default.html", "default.htm"]}))
	var build = express.static(__dirname + "/public/build",
		{
			maxAge: '1h', index: 'index.html', fallthrough: true, redirect: false
		});
	app.use('/build', (req, res, arg1, arg2, arg3) => {
		console.log('req, res, arg1, arg2, arg3');
		return build(req, res, arg1, arg2, arg3);
	});
	app.use('/build', build);

	var IOTest = express.static(__dirname + "/public/io-test",
		{
			maxAge: '1h', index: 'index.html', fallthrough: true
		});
	app.use('/io-test', IOTest);

	app.use('/tmp', express.static(__dirname + "/public/dist"));

	app.use(express.static("public/dist"));

	// Home url
	// /user/:name => req.params.name
	app.get("/", (req, res) => {
		// api result
		//res.json({message: "Notetaking API v1"});
		res.sendFile(path.join(__dirname, 'ClientApp', 'dist', 'index.html'));
		//res.redirect('/index.html');

	});

	const redirectRequest = (req, res, next, newurl, locationName) => {
		console.log(`pipe`, { newurl, locationName });
		try {
			// send error page
			const R = request.get(newurl);

			R.on('error', (error) => console.log(`request on error`, error));
			//R.onerror((error) => console.log(`request on error`, error));
			//R.on("complete", (resp) => {resp.pipe(res); next();});
			R.pipe(res); next();
			console.log(`pipe`);
			return R;
		} catch (error) {
			console.log(`pipe error`, error);
		}
	}

	// http://127.0.0.1:3000/getSingle?id=5
	app.get('/interpolation4/*', async function (req, res) {
		try {
			//modify the url in any way you want
			var locationName = 'interpolation';
			//const newurl = 'http://localhost:3001/'+locationName;
			const newurl = 'http://127.0.0.1:3001/' + locationName;
			//const newurl = '127.0.0.1:3001/'+locationName;

			console.log('app.get interpolation', { locationName, newurl });

			const toPipe = request.get(newurl);
			if (toPipe) {
				console.log('if toPipe');
				//return toPipe.pipe(res);
				const body = toPipe.body;


				res.pipe(toPipe);
			}

			const err = new Error('request.get faile');
			console.error('app.get interpolation error', err);
			res.pipe(err);
		}
		catch (err) {
			console.error('app.get interpolation catch error', err);
			//res.send(err);
		}

	});


	// http://127.0.0.1:3000/interpolation?id=5
	app.get('/interpolation3', async function (req, res) {
		try {
			//modify the url in any way you want
			var locationName = 'interpolation';
			//const newurl = 'http://localhost:3001/'+locationName;
			const newurl = 'http://127.0.0.1:3001/' + locationName;
			//const newurl = '127.0.0.1:3001/'+locationName;

			return request.get(newurl).pipe(res);
		}
		catch (err) {
			res.send(err);
		}
	});

	app.get('/interpolation2', async function (req, res, next) {
		/* request.get({
			//uri: 'http://localhost:8000/names'
			uri: newurl
		}, function(err, res, body){
			console.log(`request.get`, {err, res, body});
		}); */

		//return redirectRequest(req, res, next, newurl, locationName);

		//res.redirect('https://app.example.io');
		//res.location(newurl);

		//http.get(newurl).pipe(res);
		//res.send(require(newurl));

		//res.status(200).send(data);

	});

	app.get('/interpolation1', async function (req, res, next) {
		//modify the url in any way you want
		//const newurl = 'http://localhost:3001/interpolation';
		const newurl = '127.0.0.1:3001/interpolation';
		var locationName = 'interpolation';
		//request.get(newurl).pipe(res);

		//return redirectRequest(req, res, next, newurl, locationName);

		//res.redirect('https://app.example.io');
		//res.location(newurl);

		//http.get(newurl).pipe(res);
		//res.send(require(newurl));

		/* request(newurl, function (error, response, body) {
			if (error) {
				console.log('error:', error); // Print the error if one occurred and handle it
			}
			console.log('statusCode:', { response, statusCode: response.statusCode }); // Print the response status code if a response was received
			//res.send(body);
			response.pipe(res);
		}); */

		var data;
		/* try {
			var optionsget = {
				host : 'localhost',
				port : 3001,
				//path : '/quote/random', // the rest of the url with parameters if needed
				path : '/interpolation',
				method : 'GET' // do GET
			};
			//const axiosResponse = await axios.get(newurl);
			const axiosResponse = http.get(optionsget);
			const response = axiosResponse.;
			data = response.data;
			console.log(`interpolation`, data);
		} catch (error) {
			console.log(`interpolation error`, error);
		} */

		var options = {
			protocol: 'http:',
			host: 'localhost',
			port: 3001,
			path: '/interpolation',
			method: 'GET'
		};

		var callback = function (response) {
			var str = '';

			//another chunk of data has been recieved, so append it to `str`
			response.on('data', function (chunk) {
				str += chunk;
			});

			//the whole response has been recieved, so we just print it out here
			response.on('end', function () {
				console.log(str);
			});
		}

		var request = http.request(options, callback);

		request.on('error', function (err) {
			// handle errors with the request itself
			console.error('Error with the request:', err.message);
		});

		request.end();


		//data = 'data';
		//res.send(data);
		res.status(200).send(data);

	});


	// public/images/kitten.jpg
	// http://localhost:3000/static/images/kitten.jpg
	//app.use('/static', express.static('public'));

	// http://localhost:3000/images/kitten.jpg
	//app.use(express.static('public'));

	// http://127.0.0.1:3000/getSingle?id=5
	app.get('/getSingle', async function (req, res) {
		try {
			//var id = req.param('id');
			//var id = req.param.id; 
			var query = req.query;

			console.log('getSingle', query);

			res.send({ query });
		}
		catch (err) {
			res.send(err);
		}

	});

	app.get('/protected', isAuthenticated, (req, res) => {
		res.send({ message: 'This is private area', user: req.user });
	});

	//console.log('moviesApi');
	//moviesApi.run(app);

	// use
	console.log('Init http Server');
	const server = await app.listen(PORT, () => {
		console.log(`Server is listening on PORT ${PORT}
load http://127.0.0.1:${PORT}/ OR http://localhost:${PORT}/ 
in a browser to see the output`);
	});


	//#region ** socketIO **

	const config = {
		cors: {
			origin: '*',
			//methods: ['GET', 'POST']
		}
	};
	const io = socketIO(server, config);

	//chat(io);

	console.log('Init Socket IO');

	const connectedUserMap = new Map([[Number.MAX_VALUE, { status: 'online', name: 'admin' }]]);

	io.on('connection', (socket) => {
		const connectedUserId = socket.id;
		const connectedUser = () => {
			let user = connectedUserMap.get(connectedUserId);
			return user ? (user.name ? user.name : connectedUserId) : connectedUserId;
		};

		console.log(`user ${connectedUser()} connected, connection socket.`, socket.rooms);

		//add property value when assigning user to map
		connectedUserMap.set(connectedUserId, { status: 'online', name: '' });

		const leave = (room = "room 237", emitText = `user ${connectedUser()} has left the room`) => {
			socket.leave(room);
			io.to(room).emit(emitText);
			console.log(emitText + `, room: ${room}`);
		}

		const join = (room = "room 237", emitText = `user ${connectedUser()} has joined the room`) => {
			socket.join(room);
			io.to(room).emit(emitText);
			console.log(emitText + `, room: ${room}`);
		}

		/* Rooms */
		//console.log('rooms', socket.rooms); // Set { <socket.id> }
		//join("room1"); //leave
		//console.log('join room1 rooms', socket.rooms); // Set { <socket.id>, "room1" }

		const chatMessageType = {
			ChatMessage: 'chat message',
			welcome: 'welcome',
			join: 'join',
			disconnect: 'disconnect',
			message: 'message',
			recieveUserName: 'recieveUserName',
			callTest: 'callTest',

		}

		/* recieve User Name */
		socket.on(chatMessageType.recieveUserName, function (name = '') {
			socket.name = name
			//find user by there socket in the map the update name property of value
			let user = connectedUserMap.get(connectedUserId);
			if (user) {
				user.name = name;
			}
			io.emit('chat message', { type: chatMessageType.recieveUserName, id: connectedUserId, name }); // This will emit the event to all connected sockets
		});

		/* 
typeof(() => {});
'function'
typeof({});
'object'
typeof(function (params) { });
'function'
typeof(typeof);
VM165:1 Uncaught SyntaxError: Unexpected token ')'
typeof(typeof);
VM171:1 Uncaught SyntaxError: Unexpected token ')'
typeof(this);
'object'
typeof([]);
'object'
 */
		function mapToStr(obj = {}) {
			console.log(`mapToStr`);
			if (obj !== undefined) {
				console.log(`mapToStr obj`, obj);
				if (typeof (obj) === 'object' && obj.length && obj.length > 0) {
					console.log(`typeof (obj) === 'arr'`);
					for (let index = 0; index < obj.length; index++) {
						obj[index] = mapToStr(obj[index]);
					}
				}
				else if (typeof (obj) === 'object') {
					console.log(`typeof (obj) === 'object'`);
					for (const key in obj) {
						const element = obj[key];
						if (element) {
							if (typeof (element) === 'function') {
								var toString = element.toString();
								obj[key] = { type: 'func', toString };
							}
						}
					}
				}

				else {

				}
			}

			return obj;
		}

		/* call Test */
		socket.on(chatMessageType.callTest, function (name = '') {
			//find user by there socket in the map the update name property of value
			//var str = mapToStr(require('./initData'));
			var str = require('./initData');
			io.emit('chat message', {
				type: chatMessageType.callTest, id: connectedUserId, name,
				require: str
			}); // This will emit the event to all connected sockets
		});


		/* welcome connectedUserId */
		//io.to(connectedUserId).emit('chat message', `you welcome: ${connectedUserId} to chat app`);
		io.to(connectedUserId).emit('chat message', { type: chatMessageType.welcome, id: connectedUserId });
		
		/* broadcast connectedUserId joined */
		//socket.broadcast.emit('chat message', `say welcome to: ${connectedUserId}`);
		socket.broadcast.emit('chat message', { type: chatMessageType.join, id: connectedUserId });

		/* disconnect */
		socket.on('disconnect', () => {
			io.emit('chat message', { type: chatMessageType.disconnect, id: connectedUserId }); // This will emit the event to all connected sockets
			console.log(`user ${connectedUserId} disconnected.`);
		});

		/* chat message */
		socket.on('chat message', (msg = '') => {
			console.log('message: ' + msg);
			io.emit('chat message', { type: chatMessageType.message, id: connectedUserId, msg });
		});

		// send an event to everyone
		//io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets

		// send a message to everyone except for a certain emitting socket
		//socket.broadcast.emit('chat message', 'hi from user');

		//io.sockets.emit('message', { type: 'new user' });


		//socket.on('getMessages', () => this.getMessages());
		//socket.on('message', (value) => this.handleMessage(value));
		socket.on('message', (value) => { console.log(`socket.on message, value: ${value}`); });
		//socket.on('disconnect', () => this.disconnect());
		socket.on('connect_error', (err) => {
			console.log(`connect_error due to ${err.message}`);
		});

	});



	//#endregion


	//server.listen(3000);

}
run()
	.catch(reason => console.log('catch error in main run', reason))
	.then(() => console.log('then in main run'));
//.finally(() => console.log('finally in run function'));

