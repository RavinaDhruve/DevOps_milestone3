#!/bin/bash

node app.js Prod 3000 &

wget http://download.redis.io/releases/redis-3.0.5.tar.gz
tar xzf redis-3.0.5.tar.gz
cd redis-3.0.5
make

src/redis-server &

echo "DEPLOY COMPLETED SUCCESSFULLY."