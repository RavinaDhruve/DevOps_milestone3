#!/bin/bash

sudo docker run -d --name redis1 crosbymichael/redis
sudo docker run -td --name prodtest8 ubuntu:trusty

sudo docker stop $(sudo docker ps -a -f 'name=prod*' -q)
sudo docker rm $(sudo docker ps -a -f 'name=prod*' -q)

sudo docker stop $(sudo docker ps -a -f 'name=redis*' -q)
sudo docker rm $(sudo docker ps -a -f 'name=redis*' -q)


sudo docker run -d --name redis crosbymichael/redis
./redis-server -h 107.170.19.156 -p 6379 slaveof 104.131.197.251 6379

sudo docker run -d --link redis:redis --name redis_ambassador -p 6379:6379 svendowideit/ambassador

sudo docker run --link redis_ambassador:redis -v `pwd`:/server -p 3000:5000 -td --name prodtest1 ubuntu:trusty

sudo docker exec -td prodtest1 sh -c "sudo apt-get update"
sudo docker exec -td prodtest1 sh -c "sudo apt-get install npm"
sudo docker exec -td prodtest1 sh -c "npm install nodejs"

sudo docker exec -td prodtest1 sh -c "nodejs server/app.js Prod 5000"


echo "DEPLOY COMPLETED SUCCESSFULLY."