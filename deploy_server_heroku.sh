#! /bin/bash
 yarn build:server 
 heroku container:push --app=aqueous-peak-38871 web
 heroku container:release --app=aqueous-peak-38871 web
#  docker build -t jhmcneill/abb:latest .  
#  docker push jhmcneill/abb:latest
#  ssh root@138.197.146.50 "docker pull jhmcneill/abb:latest && docker tag jhmcneill/abb:latest dokku/abb:latest && dokku tags:deploy abb latest"