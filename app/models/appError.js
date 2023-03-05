"use strict";

function AppError(errorCode, detail) {
  this.errorCode = errorCode;
  let err = this.errorMap.get(errorCode);
  this.message = err.msg;
  this.status = err.status;
  this.detail = detail;
}
AppError.prototype.errorMap = new Map();
// User
AppError.prototype.errorMap.set(1002, { status: 401, msg: "Invalid password" });
AppError.prototype.errorMap.set(1003, { status: 400, msg: "Invalid token" });
AppError.prototype.errorMap.set(1004, {
  status: 404,
  msg: "Cannot find user by token",
});
AppError.prototype.errorMap.set(1005, {
  status: 404,
  msg: "User level not found",
});
AppError.prototype.errorMap.set(1006, {
  status: 401,
  msg: "User level unauthorized",
});
AppError.prototype.errorMap.set(1007, {
  status: 404,
  msg: "User _id not found",
});
AppError.prototype.errorMap.set(1008, {
  status: 401,
  msg: "User validation failed",
});
AppError.prototype.errorMap.set(1009, { status: 404, msg: "No user found" });
AppError.prototype.errorMap.set(1010, { status: 404, msg: "No org found" });
AppError.prototype.errorMap.set(1011, {
  status: 400,
  msg: "User is already org candidate",
});
AppError.prototype.errorMap.set(1012, {
  status: 400,
  msg: "User is already org member",
});
AppError.prototype.errorMap.set(1013, { status: 400, msg: "User is org" });
AppError.prototype.errorMap.set(1014, {
  status: 400,
  msg: "User is not an org",
});
AppError.prototype.errorMap.set(1015, { status: 404, msg: "No user found" });
AppError.prototype.errorMap.set(1016, {
  status: 400,
  msg: "User id already registered",
});
AppError.prototype.errorMap.set(1017, {
  status: 400,
  msg: "User must join a organization before applying to be a secretary",
});
AppError.prototype.errorMap.set(1018, {
  status: 400,
  msg: "User has already applied for secretary",
});
AppError.prototype.errorMap.set(1019, {
  status: 400,
  msg: "User is already a Secretary",
});
AppError.prototype.errorMap.set(1020, {
  status: 400,
  msg: "Invalid user level",
});
AppError.prototype.errorMap.set(1021, {
  status: 400,
  msg: "Cannot approve secretary application of other organization",
});
AppError.prototype.errorMap.set(1022, {
  status: 400,
  msg: "User has not applied to be secretary",
});

// BigEvent
AppError.prototype.errorMap.set(2002, {
  status: 400,
  msg: "BigEvent id already registered",
});
AppError.prototype.errorMap.set(2003, {
  status: 404,
  msg: "BigEvent _id not found",
});
AppError.prototype.errorMap.set(2004, {
  status: 404,
  msg: "No bigEvent found",
});
AppError.prototype.errorMap.set(2005, {
  status: 401,
  msg: "User is not authorized to update bigEvent",
});
AppError.prototype.errorMap.set(2006, { status: 400, msg: "No vacant seat" });
AppError.prototype.errorMap.set(2007, {
  status: 400,
  msg: "User already booked this bigEvent",
});
AppError.prototype.errorMap.set(2008, {
  status: 400,
  msg: "Client and teacher cannot be the same",
});
AppError.prototype.errorMap.set(2009, {
  status: 400,
  msg: "User cannot afford bigEvent",
});
AppError.prototype.errorMap.set(2010, {
  status: 400,
  msg: "No available free time for reservation",
});

// Charge
AppError.prototype.errorMap.set(3001, { status: 400, msg: "INVALID data" });
AppError.prototype.errorMap.set(3002, {
  status: 400,
  msg: "You have already purchased this video",
});
AppError.prototype.errorMap.set(3003, { status: 404, msg: "No order_no" });
AppError.prototype.errorMap.set(3004, { status: 404, msg: "No userId" });
AppError.prototype.errorMap.set(3005, { status: 404, msg: "No amount" });
AppError.prototype.errorMap.set(3006, {
  status: 404,
  msg: "No charge found by order_no",
});
AppError.prototype.errorMap.set(3007, {
  status: 404,
  msg: "No user found by userId",
});

// Favorite
AppError.prototype.errorMap.set(4001, { status: 400, msg: "type is required" });
AppError.prototype.errorMap.set(4002, { status: 400, msg: "_id is required" });
AppError.prototype.errorMap.set(4003, {
  status: 400,
  msg: "Cannot like yourself",
});
AppError.prototype.errorMap.set(4004, {
  status: 400,
  msg: "Cannot unlike yourself",
});

// Review
AppError.prototype.errorMap.set(5001, {
  status: 400,
  msg: "Cannot review reservation",
});
AppError.prototype.errorMap.set(5002, {
  status: 400,
  msg: "Reservation already reviewed",
});
AppError.prototype.errorMap.set(5003, { status: 400, msg: "Not found" });
AppError.prototype.errorMap.set(5004, { status: 400, msg: "_id not found" });

// Service
AppError.prototype.errorMap.set(6001, { status: 400, msg: "No service found" });
AppError.prototype.errorMap.set(6002, {
  status: 400,
  msg: "Client and Teacher can not be the same person",
});
AppError.prototype.errorMap.set(6003, {
  status: 400,
  msg: "Cannot afford service",
});
AppError.prototype.errorMap.set(6004, {
  status: 400,
  msg: "No available free time",
});
AppError.prototype.errorMap.set(6005, {
  status: 400,
  msg: "Cannot cancel other clients reservation",
});
AppError.prototype.errorMap.set(6006, {
  status: 400,
  msg: "Reservation is not open",
});
AppError.prototype.errorMap.set(6007, {
  status: 400,
  msg: "Reservation does not belong to service nor bigEvent",
});
AppError.prototype.errorMap.set(6008, {
  status: 400,
  msg: "User has not canceled reservation",
});
AppError.prototype.errorMap.set(6009, {
  status: 400,
  msg: "Service id already registered",
});
AppError.prototype.errorMap.set(6010, {
  status: 400,
  msg: "Cannot update other clients service",
});
AppError.prototype.errorMap.set(6011, {
  status: 400,
  msg: "No service _id found",
});
AppError.prototype.errorMap.set(6012, {
  status: 400,
  msg: "Reservation is canceled",
});
AppError.prototype.errorMap.set(6013, {
  status: 400,
  msg: "Reservation expired",
});
AppError.prototype.errorMap.set(6014, {
  status: 400,
  msg: "Service or bigEvent not exists",
});
AppError.prototype.errorMap.set(6015, {
  status: 400,
  msg: "Org id already registered",
});
AppError.prototype.errorMap.set(6016, {
  status: 400,
  msg: "JMessage register falied",
});

module.exports = AppError;
