"use strict";

const _ = require("lodash");
const { NODE_ENV } = process.env;

// Extend the base configuration in all.js with environment specific configuration
module.exports = _.extend(
  require(`${__dirname}/../config/env/all.js`),
  require(`${__dirname}/../config/env/${NODE_ENV}.js`) || {}
);
