#!/bin/bash

sudo apt-get update
sudo apt-get install npm
sudo npm install nodejs
sudo apt-get install nodejs-legacy
sudo apt-get install git
sudo apt-get remove redis-server
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

#sentinel-conf
sed -i '2s/^/daemonize yes /' sentinel.conf
sed -i 's/sentinel monitor mymaster 127.0.0.1 6379 2/sentinel monitor masterServer 107.170.51.11 6379 1/g' sentinel.conf
sed -i 's/sentinel down-after-milliseconds mymaster 30000/sentinel down-after-milliseconds masterServer 5000/g' sentinel.conf
sed -i 's/sentinel parallel-syncs mymaster 1/sentinel parallel-syncs masterServer 1/g' sentinel.conf
sed -i 's/sentinel failover-timeout mymaster 180000/sentinel failover-timeout masterServer 10000/g' sentinel.conf

echo "Sentinel configuration change done"

#daemonizing redis-server
#first start
sudo service redis-server start

sed -i 's/daemonize no/daemonize yes/g' redis.conf
echo "Redis configuration change done"

#starting redis-server
sudo service redis-server restart

#starting sentinel
sudo redis-server sentinel.conf --sentinel

#src/redis-cli 'config set stop-writes-on-bgsave-error no && exit'
cd ../


#WEB SERVER
npm install
sudo npm install -g forever
sudo forever stop app.js
sudo bash -c 'forever -w start app.js Master 3000'

echo "DEPLOY COMPLETED SUCCESSFULLY."