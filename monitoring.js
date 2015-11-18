var exec = require('child_process').exec;
var nodemailer = require('nodemailer');

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
        if(parseInt(stats[1])>7)
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