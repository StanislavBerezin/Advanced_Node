const mongoose = require('mongoose')

const exec = mongoose.Query.prototype.exec

mongoose.Query.prototype.exec = function () {

    console.log("im a bout to run")
    // need to work here/ thats where stopped
    //need to execute a redis search before db


    // to run original exec
    return exec.apply(this, arguments)


}

// const redis = require('redis')
// const redisUrl = 'redis://127.0.0.1:6379'
// const client = redis.createClient(redisUrl)
// const util = require('util')
// // everytime client.get is called it will be wrapped in the promise
// client.get = util.promisify(client.get)

// const cachedBlogs = await client.get(req.user.id)

// // no need to write else because we return
// if (cachedBlogs) {
//     console.log('serving from cache')
//     return res.send(JSON.parse(cachedBlogs))
// }