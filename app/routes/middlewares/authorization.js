"use strict";

/**
 * Generic require login routing middleware
 */

module.exports = function (passport) {
  return {
    requiresLogin: function (req, res, next) {
      return passport.authenticate(
        "token",
        { session: false },
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
  };
};
