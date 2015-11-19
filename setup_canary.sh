#!/bin/bash

sudo docker run -d --name redis1 crosbymichael/redis
sudo docker run -td --name prodtest8 m3app:latest

sudo docker stop $(sudo docker ps -a -f 'name=redis*' -q)
sudo docker rm $(sudo docker ps -a -f 'name=redis*' -q)

sudo docker stop $(sudo docker ps -a -f 'name=prodtest2' -q)
sudo docker rm $(sudo docker ps -a -f 'name=prodtest2' -q)

sudo docker run -d --name redis crosbymichael/redis
sudo docker run -d --link redis:redis --name redis_ambassador -p 6379:6379 svendowideit/ambassador

nodejs redis_store.js
sudo docker run --link redis_ambassador:redis -v `pwd`:/server -p 3001:6001 -td --name prodtest2 m3app:latest
sudo docker exec -td prodtest2 sh -c "nodejs server/app.js Canary 6001"

echo "DEPLOY COMPLETED SUCCESSFULLY."