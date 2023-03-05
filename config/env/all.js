"use strict";

var path = require("path");
var rootPath = path.normalize(__dirname + "/../..");

module.exports = {
  root: rootPath,
  port: process.env.PORT || 3000,
  db: process.env.MONGOHQ_URL,
  // is used to compute a session hash
  sessionSecret: "SC",
  // The name of the MongoDB collection to store sessions in
  sessionCollection: "sessions",
  jwtSecret: "scunknown",
};
