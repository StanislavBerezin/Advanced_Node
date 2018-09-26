const {
    clearHash
} = require('../services/cache');

// will be executed before going away from assigned route
// this is just an example of how to remove cache for existing user
module.exports = async (req, res, next) => {
    await next();

    clearHash(req.user.id);
};