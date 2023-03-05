"use strict";

const mongoose = require("mongoose");
const LocalStrategy = require("passport-local").Strategy;
const TokenStrategy = require("passport-token").Strategy;
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");
const config = require("./config");
const AppError = require("../app/models/appError");

module.exports = function (passport) {
  // Use local strategy
  passport.use(
    new LocalStrategy(
      {
        usernameField: "id",
        passwordField: "password",
      },
      async function (id, password, done) {
        try {
          const user = await User.findOne({ id: id });
          if (!user) {
            return done(null, false, new AppError(1015));
          }
          if (!user.authenticate(password)) {
            return done(null, false, new AppError(1002));
          }
          const token = jwt.sign(
            {
              userId: user._id,
            },
            config.jwtSecret,
            {
              expiresIn: 10080 * 60,
            }
          );
          user.token = token;
          await user.save();
          done(null, {
            _id: user._id,
            id: user.id,
            token: user.token,
            nickname: user.nickname,
          });
        } catch (err) {
          done(err);
        }
      }
    )
  );

  // Use token strategy
  passport.use(
    new TokenStrategy(
      {
        usernameHeader: "sc-token",
        usernameField: "sc-token",
        tokenHeader: "x-sc-token",
        tokenField: "sc-token",
      },
      async function (username, token, done) {
        try {
          const decodedToken = await jwt.verify(token, config.jwtSecret);
          const user = await User.findOne({ token });
          if (!user) {
            return done(null, false, new AppError(1004));
          }
          return done(null, user, { decodedToken });
        } catch (err) {
          return done(null, false, new AppError(1003));
        }
      }
    )
  );
};
