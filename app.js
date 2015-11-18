
/**
 * Module dependencies.
 */

var express = require('express'),
  routes = require('./routes'),
  user = require('./routes/user'),
  http = require('http'),
  path = require('path'),
  io = require('socket.io-client'),
  os = require('os'),
  redis = require('redis'),
  nodemailer = require('nodemailer');

var redis = require('redis');
var client = redis.createClient(6379, process.env.REDIS_PORT_6379_TCP_ADDR , {});

var node = process.argv[2];
console.log("This is Server:", node);

var app = express();
var alert_flag = 0


app.configure(function(){
  app.set('port', process.env.PORT || 5000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

/*app.get('/', function(req, res){
  res.render('index', {
    title: 'Home'
  })
});*/
if(app.get('port') == '5000')
  var message = 'Production! (Stable)'
else
  var message = 'Canary'

if(app.get('port') == '5000')
  name = 'production'
else
  name = 'canary'



client.hmget(node, '/', function(err,value){ 

  var flag = (value.toString());
  if(flag === 'True') {

    app.get('/',function(req, res) { 
      res.writeHead(200, {'content-type':'text/html'});
        res.write(message);
    });
  } // end of flag checking

  //console.log("\nFeature Flag off. No service found!");
  
}); // end of redis check function

app.get('/home',function(req, res) {
  res.render('index', {
    title: 'Home'
  });
});

client.hmget(node, '/about', function(err,value){ 

  var flag = (value.toString());
  if(flag === 'True') {
    app.get('/about', function(req, res){
      res.render('about', {
        title: 'About'
      });
    });
  } // end of flag checking

  //console.log("\nFeature Flag off. No service found!");
  
}); // end of redis check function 

app.get('/contact', function(req, res){
  res.render('contact', {
    title: 'Contact'
  });
});


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

