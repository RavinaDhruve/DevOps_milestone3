#!/bin/bash

sudo apt-get install sshpass
#sshpass -p rootroot ssh root@107.170.19.156

sshpass -p 'rootroot' ssh -o StrictHostKeyChecking=no root@107.170.19.156 'scp root@104.131.197.251:/var/lib/jenkins/jobs/Migration_monkey/workspace/new_env.sh migrate.sh && sh new_env.sh'

#scp root@104.131.197.251:/var/lib/jenkins/jobs/Migration_monkey/workspace/migrate.sh migrate.sh