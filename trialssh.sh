#!/bin/bash

sudo apt-get install sshpass
#sshpass -p rootroot ssh root@107.170.19.156

#scp -r /var/lib/jenkins/jobs/Migration_monkey/workspace/new_env.sh root@107.170.19.156:new_env.sh

sshpass -p 'rootroot' ssh -o StrictHostKeyChecking=no root@107.170.19.156 'git clone https://github.com/RavinaDhruve/DevOps_milestone3.git && cd DevOps_milestone3 && sh new_env.sh'
