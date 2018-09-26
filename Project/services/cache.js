const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');
const keys = require('../config/keys');

const client = redis.createClient(keys.redisUrl);
client.hget = util.promisify(client.hget);

// this is to override the existing function
const exec = mongoose.Query.prototype.exec;


// everytime when cache() is called when working with blogs, it will initialise variable useCache
// and set it to true (to know if something should be hashed). then hashkey is used to search for the main key
// and locate all nested values associated with it.
mongoose.Query.prototype.cache = function (options = {}) {
    this.useCache = true;
    this.hashKey = JSON.stringify(options.key || '');

    // so that we can chain it further
    return this;
};

mongoose.Query.prototype.exec = async function () {
    // if there is no need to cache then do the regular exec function
    if (!this.useCache) {
        return exec.apply(this, arguments);
    }

    // this create a key that is like an object with this.getQuery results and this.mongooseCollectionName
    // which can be used for searches.
    const key = JSON.stringify(
        Object.assign({}, this.getQuery(), {
            collection: this.mongooseCollection.name
        })
    );

    // See if we have a value for 'key' in redis
    const cacheValue = await client.hget(this.hashKey, key);

    // If we do, return that
    if (cacheValue) {
        const doc = JSON.parse(cacheValue);
        console.log('comes from cache')
        // it has to be returned like an array to fit the pre-existing understanding
        // of mongoose models
        return Array.isArray(doc) ?
            doc.map(d => new this.model(d)) :
            new this.model(doc);
    }
    console.log('doesnt exist in cash but now does')
    // Otherwise, issue the query and store the result in redis
    const result = await exec.apply(this, arguments);
    client.hset(this.hashKey, key, JSON.stringify(result), 'EX', 10);
    return result;
};
module.exports = {
    clearHash(hashKey) {
        client.del(JSON.stringify(hashKey));
    }
};