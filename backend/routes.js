var express = require("express");
var app = express();

// Defining all the routes
var employees = require("./routes/employeeRoutes");

// Linking all the routes
app.use("/employees", employees);

module.exports = app;
