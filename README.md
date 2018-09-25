# Start

If some functions or libraries require callbacks we can do the following to make use of await and promises

```
 client.get = util.promisify(client.get)
```

expiry: client.set('key','value', 'EX', 5 ) 5 is for 5 seconds

client.get in this case is wrapped in promise, but the same logic could be applied to anything.

Cookie session to work with authenticaton for incoming requests
Passport - authentication for the app

# Caching

ID is the most efficient form when accessing data from database without causing computation leaks.

Cache layer (server) (REDIS)

To visualise: You have your server with express and sequalise or mongoose, everytme when you need to access data, the last 2 make requests to DB. The caching would imply adding a layer (server) between sequalise/mongoose, to look up for the data there instead of going to DB (if unchanged and if query was performed before). If no previous query was done before, then cache server will go to DB and save results inside of itself and send it to client.
node-redis JS library to communicate with Redis server

# Redis

Establish

```
    const redis = require('redis')
    const redisUrl = 'redis://127.0.0.1:6379'
    const client = redis.CreateClient(redisUrl)
```

Redis has KEY and Values , like json. So to get data from node-redis `get('key', (err, val)=> consolelog(val))`

We can set hashes, similar to a variable object, containing other objects like :

```
const example = {
    test1: {
        here: 'there'
    },
    test2{
        here1: 'there1'
    }
}
```

to set hashes can type `client.hset('test1', 'imKey','imValue')` and to get it `client.hget('test1', 'imKey' , (err, res)=>console.log(res))`

if want to store objects in values then need `JSON.stringify({key: 'Value})` and to retreie it `(err, res)=> console.log(JSON.parse(res))`

client.flushall() removes everything

# Efficiency

1. Need to hook up redis query search before each DB execution is made
2. Expiry dates
3. Robust key generation
