#!/bin/bash

#REDIS SERVER
wget http://download.redis.io/releases/redis-3.0.5.tar.gz
tar xzf redis-3.0.5.tar.gz
cd redis-3.0.5
make

#daemonizing redis-server
sed -i 's/daemonize no/daemonize yes/g' redis.conf
sed -i 's/# bind 127.0.0.1/bind 107.170.19.156/g' redis.conf
sed -i 's/# slaveof <masterip> <masterport>/slaveof 162.243.114.143 6379/g' redis.conf
echo "Change done"

src/redis-server redis.conf
cd ../



#WEB SERVER
npm install
sudo npm install -g forever
sudo bash -c 'forever -w start app.js Prod 6700'

echo "DEPLOY TO MIGRATED SITE COMPLETED SUCCESSFULLY."