"use strict";
const mongoose = require("mongoose");
const User = mongoose.model("User");
const AppError = require("../models/appError");

// 注册用户
exports.createUser = async (req, res, next) => {
  try {
    const userExists = await User.exists({ id: req.body.id });
    if (userExists) {
      throw new AppError(1016);
    }
    const user = await User.create(req.body);
    return res.status(200).json(user);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return next(new AppError(1008, err));
    }
    return next(err);
  }
};

//登陆
exports.login = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { lastLogin: Date.now() },
      { new: true }
    );
    const sessionObj = user.toJSON();
    delete sessionObj.hashed_password;
    return res.send(sessionObj);
  } catch (err) {
    return next(err);
  }
};
