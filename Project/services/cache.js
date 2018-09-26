const mongoose = require("mongoose");
const redis = require("redis");
const redisUrl = "redis://127.0.0.1:6379";
const client = redis.createClient(redisUrl);
const util = require("util");
const exec = mongoose.Query.prototype.exec;
client.get = util.promisify(client.get);
mongoose.Query.prototype.exec = function() {
  console.log("im a bout to run");
  // need to work here/ thats where stopped
  //need to execute a redis search before db

  //   Object assign as the first arguents takes what we want to create
  // its an object, then inside of there we store result of this.getQuery
  //and this.mongoocseCollection.name
  const key = Object.assign({}, this.getQuery(), {
    collection: this.mongooseCollection.name
  });

  console.log(key);

  // to run original exec
  return exec.apply(this, arguments);
};

// // everytime client.get is called it will be wrapped in the promise
// client.get = util.promisify(client.get)

// const cachedBlogs = await client.get(req.user.id)

// // no need to write else because we return
// if (cachedBlogs) {
//     console.log('serving from cache')
//     return res.send(JSON.parse(cachedBlogs))
// }
