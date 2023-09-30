#!/bin/bash
#this code will be run in the ./.git/hooks/post-merge
yarn install --prod
sudo systemctl restart xnor-intro.service
