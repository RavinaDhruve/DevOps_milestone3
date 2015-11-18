var redis = require('redis');

var client = redis.createClient(6379, '127.0.0.1', {});

// cleaning for debugging purpose
//client.del('Prod');
//client.del('Canary');

client.hmset('Prod', {
        '/': 'True',
        '/about': 'False'
});

client.hmset('Canary', {
        '/': 'True',
        '/about': 'True'
});

console.log("Values set in REDIS store.");
client.quit();