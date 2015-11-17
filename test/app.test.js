var app = require('../app'),
  assert = require('assert'),
  http = require('http');


describe('GET /', function(){

  it('should return a 200 status code', function (done){
    http.get({ host: '192.241.175.40', port: 5000 }, function(res) {
      assert.deepEqual(res.statusCode, 200)
      done();
    }).on('error', function(e) {
      throw new Error(e);
    });
  });

});

