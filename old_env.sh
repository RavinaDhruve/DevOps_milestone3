#!/bin/bash

#REDIS SERVER
wget http://download.redis.io/releases/redis-3.0.5.tar.gz
tar xzf redis-3.0.5.tar.gz
cd redis-3.0.5
make

#daemonizing redis-server
sed -i 's/daemonize no/daemonize yes/g' redis.conf
echo "Change done"
src/redis-server redis.conf



#WEB SERVER


echo "DEPLOY COMPLETED SUCCESSFULLY."