#!/bin/bash

sudo apt-get update
sudo apt-get install npm
sudo npm install nodejs
sudo apt-get install nodejs-legacy
sudo apt-get install git
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
#first start
sudo service redis-server start

sed -i 's/daemonize no/daemonize yes/g' redis.conf
sed -i 's/# slaveof <masterip> <masterport>/slaveof 107.170.51.11 6379/g' redis.conf
echo "Change done"

sudo service redis-server restart
#src/redis-cli 'config set stop-writes-on-bgsave-error no && exit'
cd ../



#WEB SERVER
npm install
sudo npm install -g forever
sudo forever stop app.js
sudo bash -c 'forever -w start app.js Slave 6700'

echo "DEPLOY TO MIGRATED SITE COMPLETED SUCCESSFULLY."