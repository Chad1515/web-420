/* ============================================
; Title: Assignment 1.2 - app.js
; Author: Chad ONeal
; Start Date: 10/19/2022
; Description: WEB 420 app.js
============================================ 
*/

// require statements
const express = require("express");
const http = require("http");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const mongoose = require("mongoose");
const composerApi = require('./routes/oneal-composer-routes');
const personAPI = require('./routes/oneal-person-routes.js');
const UserApi = require("./routes/oneal-session-routes");
const CustomerApi = require("./routes/oneal-shopper-routes");
const TeamAPI = require('./routes/oneal-capstone-routes.js');

// app variable
const app = express();

// app listens on port 3000
const port = process.env.PORT || 3000;

// requires the use of json
app.use(express.json());

// requires use of URL encoded
app.use(express.urlencoded({ extended: true }));

/**
 * MongoDB Atlas connection string
 */
 const conn = 'mongodb+srv://web420_user:s3cret@bellevueuniversity.ox0t9kr.mongodb.net/web420DB';
 mongoose.connect(conn, {
     promiseLibrary: require('bluebird'),
     useUnifiedTopology: true,
     useNewUrlParser: true
 }).then(() => {
     console.log(`Connection to web420DB on MongoDB Atlas successful`);
 }).catch(err => {
     console.log(`MongoDB Error: ${err.message}`);
 })

// object literal options
const options = {
   definition: {
      openapi: "3.0.0",
      info: {
         title: "Web 420 RESTFul APIs",
         version: "1.0.0",
      },
   },
   apis: ["./routes/*.js"], // files containing annotations for the OpenAPI Specification
};

// openapi variable
const openapiSpecification = swaggerJsdoc(options);

// wiring of openapiSpecification
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

// Routes
app.use('/api', composerApi);
app.use('/api', personAPI);
app.use('/api', UserApi);
app.use('/api', CustomerApi);
app.use('/api', TeamAPI);

// Directing route to api-docs
app.get("*", (req, res) => {
	res.redirect("https://oneal-capstone-api.onrender.com/api-docs");
});

// app has started and listens on port 
http.createServer(app).listen(port, () => {
   console.log(`Application started and listening on port: ${port}`);
});
