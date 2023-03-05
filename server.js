"use strict";

// Module dependencies
const express = require("express");
const fs = require("fs");
const passport = require("passport");
const logger = require("mean-logger");
const cors = require("cors");
const http = require("http");
const AppError = require("./app/models/appError");

// Load configurations
// Set the node enviornment variable if not set before
process.env.NODE_ENV = "development";
process.env.PORT = 443;
process.env.httpPORT = 80;

// Initializing system variables
const config = require("./config/config");
const mongoose = require("mongoose");

const db = mongoose.connect(
  config.db,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 50000,
  },
  function (error) {
    console.log(error ?? "connection successful");
  }
);

//  models
const models_path = __dirname + "/app/models";
let modelswalk = function (path) {
  fs.readdirSync(path).forEach(function (file) {
    const newPath = path + "/" + file;
    const stat = fs.statSync(newPath);
    if (stat.isFile()) {
      if (/(.*)\.(js$|coffee$)/.test(file)) {
        require(newPath);
      }
    } else if (stat.isDirectory()) {
      modelswalk(newPath);
    }
  });
};
modelswalk(models_path);

//  passport config
require("./config/passport")(passport);

const app = express();

app.use(cors());

// Express settings
require("./config/express")(app, passport, db);

// Bootstrap routes
const routes_path = __dirname + "/app/routes";
let routewalk = function (path) {
  fs.readdirSync(path).forEach(function (file) {
    const newPath = path + "/" + file;
    const stat = fs.statSync(newPath);
    if (stat.isFile()) {
      if (/(.*)\.(js$|coffee$)/.test(file)) {
        require(newPath)(app, passport);
      }
      // We skip the app/routes/middlewares directory as it is meant to be
      // used and shared by routes as further middlewares and is not a
      // route by itself
    } else if (stat.isDirectory() && file !== "middlewares") {
      routewalk(newPath);
    }
  });
};
routewalk(routes_path);

// Error handling middleware
app.use(function (err, req, res, next) {
  if (err instanceof AppError) {
    return res.status(err.status).send(err);
  }
  console.log(err);
  return res.status(500).send("Internal Server Error");
});

// Start the app by listening on the port
const port = process.env.PORT || config.port;
const httpServer = http.createServer(app);
httpServer.listen(3000, () => {
  console.log(`Express app started on port ${port}`);
});

// Initialize logger
logger.init(app, passport, mongoose);

// Expose app
exports = module.exports = app;
