//make rate limiting to defend the system from brute force attack
const rateLimiting = require('express-rate-limit');

const rateLimit  = rateLimiting({
    windowMs:60*60*1000,
    limit:50,
    message: 'we have recive many of requests from your ip'
});

module.exports = rateLimit;