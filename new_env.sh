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
#first start
sudo /etc/init.d/redis_6379 start

sed -i 's/daemonize no/daemonize yes/g' redis.conf
sed -i 's/# slaveof <masterip> <masterport>/slaveof 107.170.51.11 6379/g' redis.conf
echo "Change done"

sudo /etc/init.d/redis_6379 restart
#src/redis-cli 'config set stop-writes-on-bgsave-error no && exit'
cd ../



#WEB SERVER
npm install
sudo npm install -g forever
sudo bash -c 'forever -w start app.js Prod 6700'

echo "DEPLOY TO MIGRATED SITE COMPLETED SUCCESSFULLY."