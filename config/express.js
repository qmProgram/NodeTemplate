"use strict";

const express = require("express");
const flash = require("connect-flash");
const helpers = require("view-helpers");
const config = require("./config");
const compression = require("compression");
const logger = require("morgan");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const cors = require("cors");

module.exports = function (app, passport, db) {
  app.set("showStackError", true);
  // Prettify HTML
  app.locals.pretty = true;
  // Set views path, template engine and default layout
  app.set("views", `${config.root}/app/views`);
  app.set("view engine", "jade");
  // Enable jsonp
  app.enable("jsonp callback");

  // Should be placed before express.static
  // To ensure that all assets and data are compressed (utilize bandwidth)
  app.use(
    compression({
      filter: (req, res) =>
        /json|text|javascript|css/.test(res.getHeader("Content-Type")),
      // Levels are specified in a range of 0 to 9, where-as 0 is
      // no compression and 9 is best compression, but slowest
      level: 9,
    })
  );

  // Only use logger for development environment
  if (process.env.NODE_ENV === "development") {
    app.use(logger("dev"));
  }

  // The cookieParser should be above session
  // app.use(express.cookieParser());

  // Request body parsing middleware should be above methodOverride
  app.use(
    bodyParser.urlencoded(
      {
        extended: true,
      },
      {
        limit: "2mb",
      }
    )
  );

  app.use(bodyParser.json({ limit: "2mb" }));
  app.use(methodOverride());

  // Dynamic helpers
  app.use(helpers(config.app.name));

  app.use(passport.initialize());

  // Connect flash for flash messages
  app.use(flash());

  //tosure
  app.use(cors());

  //static
  app.use("/", express.static(`${config.root}/public/www`));
};
