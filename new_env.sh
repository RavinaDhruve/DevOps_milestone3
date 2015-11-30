#!/bin/bash

sudo apt-get update
sudo apt-get install build-essential
sudo apt-get install tcl8.5

#REDIS SERVER
wget http://download.redis.io/releases/redis-stable.tar.gz
tar xzf redis-stable.tar.gz
cd redis-stable
make
sudo make install
cd utils
sudo ./install_server.sh
cd ../

#daemonizing redis-server
sed -i 's/daemonize no/daemonize yes/g' redis.conf
sed -i 's/# bind 127.0.0.1/bind 107.170.19.156/g' redis.conf
sed -i 's/# slaveof <masterip> <masterport>/slaveof 162.243.114.143 6379/g' redis.conf
echo "Change done"

sudo service redis_6379 start
redis-cli 'config set stop-writes-on-bgsave-error no && exit'
cd ../



#WEB SERVER
npm install
sudo npm install -g forever
sudo bash -c 'forever -w start app.js Prod 6700'

echo "DEPLOY TO MIGRATED SITE COMPLETED SUCCESSFULLY."