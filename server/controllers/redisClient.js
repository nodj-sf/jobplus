const redis = require('redis').createClient(process.env.REDIS_URL || 'redis://localhost:6379'); 

module.exports = redis;