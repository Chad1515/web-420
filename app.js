/* ============================================
; Title: Assignment 1.2 - app.js
; Author: Chad ONeal
; Start Date: 10/19/2022
; Description: WEB 420 app.js
============================================ */

// require statements
const express = require("express");
const http = require("http");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const mongoose = require("mongoose");

// app variable
const app = express();

// app listens on port 3000
const port = process.env.PORT || 3000;

// requires the use of json
app.use(express.json());

// requires use of URL encoded
app.use(express.urlencoded({ extended: true }));

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

// routes
app.get("/", (req, res) => {
   res.send("Welcome to the Web 420 RESTful APIs");
});

// app has started and listens on port 
http.createServer(app).listen(port, () => {
   console.log(`Application started and listening on port: ${port}`);
});