"use strict";

const mongoose = require("mongoose");
const crypto = require("crypto");
const mongoosePaginate = require("mongoose-paginate");

const userSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: false,
    },
    sex: {
      type: String,
      required: false,
    },
    age: {
      type: String,
      required: false,
    },
    salt: String,
    created: {
      type: Date,
      default: Date.now,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    updated: {
      type: Date,
      default: Date.now,
    },
    token: String,
  },
  {
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
    //fix pushAll mongodb new version problem
    usePushEach: true,
  }
);
userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });
userSchema.methods = {
  //check if the passwords are the same
  authenticate(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  makeSalt() {
    return crypto.randomBytes(16).toString("base64");
  },

  encryptPassword(password) {
    if (!password || !this.salt) return "";
    const salt = Buffer.from(this.salt, "base64");
    return crypto
      .pbkdf2Sync(password, salt, 10000, 64, "sha512")
      .toString("base64");
  },
  exists(query) {
    return this.findOne(query).then((result) => !!result);
  },
  toJson() {
    this.hashed_password = undefined;
    this.salt = undefined;
    return this;
  },
};
userSchema.statics = {};

userSchema.plugin(mongoosePaginate);
const User = mongoose.model("User", userSchema);
module.exports = User;
