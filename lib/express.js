// express.js

//import express from "express";
const express = require('express');

// express-middleware
//import express_middleware from "./express-middleware/index";
const express_middleware = require('./express-middleware/index');

function Run(PORT = 4300, myConfig = undefined) {
  const app = express();

  console.log('Starting Server');

  // Home url
  app.get("/", (req, res) => {
    // api result
    res.json({
      message: "Notetaking API v1"
    });
  });


  // to test usage
  //app.use(cors());

  app.use(express.json());
  //app.use(express.urlencoded({ extended: true }));

  // Using that setup we can create sessions with req.session
  app.use(cookieParser());

  app.use(express.static("ClientApp", { "index": ["index.html", "default.html", "default.htm"] }));

  express_middleware.run(app, myConfig);

  
  
  // use
  app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}
  load http://127.0.0.1:${PORT}/ OR http://localhost:${PORT}/ 
  in a browser to see the output`);
  
  });

  return app;
}

// code examples
function toAdd() {
  const path = require('path')
  const app = express()
  //.use(express.static(path.join(__dirname, 'public')))
  //.set('views', path.join(__dirname, 'views'))
  //.set('view engine', 'ejs')
  //.get('/', (req, res) => res.render('pages/index'))
  //.get('/h', (req, res) => res.render('pages/_index'))
  //.get('/db', (req, res) => res.render('pages/db', {results: [{id: 1, name: 'yotam'}]}))

}



module.exports = {
  run: Run,

}