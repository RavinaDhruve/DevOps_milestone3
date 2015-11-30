#!/usr/bin/expect -f

sudo apt-get install expect -y


spawn ssh root@107.170.19.156
expect "password"
send "rootroot\r"
interact

