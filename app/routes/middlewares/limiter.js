const Limiter = require("express-rate-limiter");
const MemoryStore = require("express-rate-limiter/lib/memoryStore");
const limiter = new Limiter({
  db: new MemoryStore(),
});

exports.limit = limiter.middleware({
  innerLimit: 15,
  outerLimit: 200,
  headers: false,
});
