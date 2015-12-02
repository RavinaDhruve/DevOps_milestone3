
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

if(process.argv[2])
  var node = process.argv[2];
else
  var node = 'Master'
console.log("This is Server:", node);

var app = express();
var alert_flag = 0

if(process.argv[3])
  var port_num = process.argv[3]
else
  var port_num = 3000

app.configure(function(){
  app.set('port', process.env.PORT || port_num);
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



app.get('/',function(req, res) { 
    res.send('Hello user!<br> from host Master Server!');
});
   // end of flag checking

app.get('/home',function(req, res) {
  res.render('index', {
    title: 'Home'
  });
});


app.get('/about', function(req, res){
  res.render('about', {
    title: 'About'
  });
});
   // end of flag checking


app.get('/contact', function(req, res){
  res.render('contact', {
    title: 'Contact'
  });
});


///////////// WEB ROUTES

/*var hits;
if(client.exists("key hits"))
{
  client.get("key hits", function(err,value){ 
    hits = value;
  });
}
else
{
  hits = 0;
}


// Sets Key-value pair which expires in sometime
app.get('/set', function(req, res) {
  // set key-value pair which expires in 10 seconds

  hits = hits + 1;
  client.set("key hits", hits)
  res.send("Value set at Master.");
})

// Gets the key-value pair
app.get('/get', function(req, res) {
  // gets the value
  client.get("key hits", function(err,value){ 
    if(value)
    {
      console.log("Value exists at Master:", value);
      res.send("Value exists at Master: "+value)
    }
      
    else
    {
      res.send("Value doesn't exist at Master.")
    } 
    //res.end();
  });
})*/
/////////////////////////////////////////////////////////////////

///////////////////////////WEB ROUTES
app.get('/setTime', function(req, res) {
  // set key-value pair which expires in 10 seconds
  client.set("Time_1", "10:00 am")
  res.send("Value set at Master.");
})

app.get('/setDay', function(req, res) {
  // set key-value pair which expires in 10 seconds
  client.set("Day_1", "Thursday")
  res.send("Value set at Master.");
})

app.get('/setMonth', function(req, res) {
  // set key-value pair which expires in 10 seconds
  client.set("Month_1", "December")
  res.send("Value set at Master.");
})

app.get('/getTime', function(req, res) {
  // gets the value
  client.get("Time_1", function(err,value){ 
    if(value)
    {
      console.log("Value exists at Master:", value);
      res.send("Value exists at Master: "+value)
    }
      
    else
    {
      res.send("Value doesn't exist at Master.")
    } 
    res.end();
  });
})

app.get('/getDay', function(req, res) {
  // gets the value
  client.get("Day_1", function(err,value){ 
    if(value)
    {
      console.log("Value exists at Master:", value);
      res.send("Value exists at Master: "+value)
    }
      
    else
    {
      res.send("Value doesn't exist at Master.")
    } 
    res.end();
  });
})

app.get('/getMonth', function(req, res) {
  // gets the value
  client.get("Month_1", function(err,value){ 
    if(value)
    {
      console.log("Value exists at Master:", value);
      res.send("Value exists at Master: "+value)
    }
      
    else
    {
      res.send("Value doesn't exist at Master.")
    } 
    res.end();
  });
})

//////////////////////////////////////////////



http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

