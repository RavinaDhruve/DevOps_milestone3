#!/bin/bash

sudo apt-get install sshpass
#sshpass -p rootroot ssh root@107.170.19.156

sshpass -p 'rootroot' ssh -o StrictHostKeyChecking=no root@107.170.19.156 'echo "DEPLOY COMPLETED SUCCESSFULLY."'