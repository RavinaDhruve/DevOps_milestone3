var exec = require('child_process').exec;
var nodemailer = require('nodemailer');
var http      = require('http');
var httpProxy = require('http-proxy');
var express = require('express')
var app = express();
var redis = require('redis');
var client = redis.createClient(6379, '127.0.0.1' , {});


ports = ['3000','3001'];
client.del('hosts')

//Canary = 3001
//Stable = 3000

for(i in ports)
{
    console.log('http://127.0.0.1:'+ports[i])
    client.lpush(['hosts','http://127.0.0.1:'+ports[i]],function(err, value) {
        console.log("VALUE : ",value)
    })
}

var options = {};
var proxy   = httpProxy.createProxyServer(options);

var server  = http.createServer(function(req, res)
{
    client.rpoplpush('hosts','hosts',function(err,value) {
        proxy.web( req, res, {target: value } );
        console.log("VALUE rpoplpush: ",value)
    })
});
server.listen(8000);

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.argv[2],
        pass: process.argv[3]
    }
});

var alert_flag = 0;

setInterval(function()
{
    exec('docker stats --no-stream prodtest1 | tail -1 | awk \'{print$2;print$8; }\'',function(err, out, code)
    {
      console.log(out);
      var stats = out.split('\n');
        //console.log(typeof(stats[1]));
        if(parseInt(stats[1])>1)
        {
                var mailOptions = {
                    from: process.argv[2], // sender address
                    to: 'rsmandao@ncsu.edu', // list of receivers
                    subject: 'Alert from Production', // Subject line
                    text: 'CPU overload!', // plaintext body
                    html: '<b>Check the release ✔</b>' // html body
                };

                if(alert_flag == 0)
                 {
                         console.log("SEND")
                         transporter.sendMail(mailOptions, function(error, info){
                         if(error){
                            return console.log(error);
                         }
                         console.log('Message sent: ' + info.response);
                         });
                       	alert_flag = 1
                 }
        }

        if (err instanceof Error)
            throw err;
            if( err )
            {
                console.error( err );
            }
    });

    exec('docker stats --no-stream prodtest2 | tail -1 | awk \'{print$2;print$8; }\'',function(err, out, code)
    {
      console.log(out);
      var stats = out.split('\n');
        console.log(typeof(stats[1]));
        if(parseInt(stats[1])>2)
        {
                var mailOptions = {
                    from: process.argv[3], // sender address
                    to: 'rsmandao@ncsu.edu', // list of receivers
                         subject: 'Alert from Canary', // Subject line
                 text: 'CPU overload!', // plaintext body
                 html: '<b>Check the release ✔</b>' // html body
                };
                if(alert_flag == 0)
                 {
                         console.log("SEND")
                         transporter.sendMail(mailOptions, function(error, info){
                         if(error){
                                 return console.log(error);
                         }
                         console.log('Message sent: ' + info.response);
                         });
                       	alert_flag = 1
                          client.del('hosts')
                        client.lpush(['hosts','http://127.0.0.1:3000'],function(err, value) {})
                 
                 }
        }

        if (err instanceof Error)
            throw err;
            if( err )
              {
                console.error( err );
              }
        });
},2000);