


// manage-users.js

//import express from "express";
//import { config, routes } from "manage-users";
const myConfig = require('../../initData');
const { config, routes } = require('manage-users');
const jwt = require('jsonwebtoken');

function Run(app) {
  // Make sure to initialize passport.
  // It is used for log in
  app.use(config.passport.initialize());
  app.use(config.passport.session());

  config.userSchemaBuilder()
    //.setUniqueKeyName('email')
    //.isUniqueKeyEmail('true')
    .setPasswordKeyName('input_password')
    //.setPasswordMinLength(6)
    .setConfirmPasswordKeyName('confirm_password')

    // must be last
    .build();

  config.repositorySchemaBuilder()
    .setRepository('mongo')
    //.setUri('mongodb://198.168.1.1:27017/my_db')
    .setUri(myConfig.mongodbRoute)
    
    .setDatabaseName('my_db')
    //.setDatabaseName(myConfig.dbName)

    //.setCollectionName('my_users')
    .setCollectionName('users')
    
    // must be last
    .build();

    app.post('/users/signup', routes.signup(), (req, res) => {
      // This middleware will only be executed if the user has successfully signed up
      // In case of successful sign up, res.locals.signup object will contain the 
      // information about signed up user.
      // In case of un-successful sign up, this middleware will not be executed, 
      // routes.signup() middleware will send appropriate error message back as the response.
      res.send({ success: true, response: res.locals.signup });
    });
  
  app.post('/users/login', routes.login(), (req, res) => {
    // This middleware will only be executed if the user has successfully logged in
    // In case of successful log in, req.user object will contain the information about 
    // logged in user.
    // In case of un-successful log in, this middleware will not be executed, 
    // routes.login() middleware will send 'Unauthorized' message back as the response.
    //console.log('req in users/login: ', req);
    // Generate an access token
    let user = req.user;
    const accessToken = jwt.sign({ username: user.username,  role: user.role }, myConfig.accessTokenSecret);
    
    res.send({ success: true, user, accessToken });
  });

  app.get('/users/logout', (req, res) => {
    // This middleware will only be executed if the user has successfully logged in
    // In case of successful log in, req.user object will contain the information about 
    // logged in user.
    // In case of un-successful log in, this middleware will not be executed, 
    // routes.login() middleware will send 'Unauthorized' message back as the response.
    //console.log('req in users/login: ', req);
    // Generate an access token
    delete req.user;
    
    //res.send({ success: true });
    res.status(200);
  });

  app.post('/users/changePassword', routes.changePassword(), (req, res) => {
    // This middleware will only be executed if the password has successfully been changed
    // In case of successful password change, no message is passed 
    // forward by routes.changePassword() middleware.
    // In case of un-successful password change, this middleware will not be executed, 
    // routes.changePassword() middleware will send appropriate error message back as the response.
    res.send({ success: true });
  });
}

module.exports = {
  run: Run,
}