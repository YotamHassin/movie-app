

// express-authentication.js
const myConfig = require('../../initData');

//import express from "express";
const jwt = require('jsonwebtoken');

// Allow CORS after the decleration
function allowCORS(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");

  let AccessControlAllowHeaders = "Origin, X-Requested-With, Content-Type, Accept, Authorization";
  res.header("Access-Control-Request-Headers", AccessControlAllowHeaders);
  // Access-Control-Allow-Headers. That header needs to contain the same values the Access-Control-Request-Headers header contained (or more)
  res.header("Access-Control-Allow-Headers", AccessControlAllowHeaders);
  res.header("Access-Control-Allow-Methods", 'DELETE');
  
  next();
}

function isAuthenticated(req, res, next) {
  // Passport will parse the request cookies and
  // create the req.user object accordingly.
  // Thus we can safely say that if req.user object
  // exists, the user is logged in

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ message: 'Unauthorized' });  
  }
  else {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, myConfig.accessTokenSecret, (err, user) => {
      if (err) {
        //return res.sendStatus(403);
        return res.status(403).send({ err });
      }

      // put user in request
      req.user = user;
      next();
    });
  }
  

}


function ExampleRun(app) {
  app.use(restrictMiddleware);

  app.get('/protected', isAuthenticated, (req, res) => {
    res.send({ message: 'This is private area', user: req.user });
  });
}

module.exports = {
  allowCORS,
  isAuthenticated
}