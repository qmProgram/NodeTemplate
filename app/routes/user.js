"use strict";
const limiter = require("./middlewares/limiter");
const user = require("../controllers/user");
const authorization = require("./middlewares/authorization");
module.exports = function (app, passport) {
  // Set up passport authorization middleware
  authorization(passport);

  // User registration endpoint
  app.post("/user/register", user.createUser);

  // User login endpoint
  app.post(
    "/user/login",
    limiter.limit,
    function (req, res, next) {
      passport.authenticate(
        "local",
        {
          session: false,
        },
        function (err, user, info) {
          if (err) {
            return next(err);
          }
          if (!user) {
            return res.status(401).send(info);
          }
          req.user = user;
          next();
        }
      )(req, res, next);
    },
    user.login
  );
};
