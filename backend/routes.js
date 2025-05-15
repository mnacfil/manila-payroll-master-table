var express = require("express");
var app = express();

// Defining all the routes
var employees = require("./routes/employeeRoutes");
var groups = require("./routes/groupRoutes");

// Linking all the routes
app.use("/employees", employees);
app.use("/groups", groups);

module.exports = app;
