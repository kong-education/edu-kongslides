#!/bin/bash

#================================================#
#       Set coulour variables                    #
#================================================#
green=$(tput setaf 2)
blue=$(tput setaf 4)
normal=$(tput sgr0)

#================================================#
#       Source env variables                     #
#================================================#
COURSEDIR="/home/ubuntu/$KONG_COURSE_ID"
source ~/.envs
clear

#================================================#
#       First bring up Kong Gateway              #
#================================================#
# printf "\n${green}Bringing up Kong Gateway.${normal}\n"
# docker compose -f $COURSEDIR/docker-compose.yaml up -d
# printf "\n${blue}Waiting for Gateway startup to finish.${normal}\n"
# until curl --head localhost:8001 > /dev/null 2>&1; do 
#     sleep 1;
# done
# clear

#================================================#
#       Then bring up other application          #
#================================================#

#App 1
# printf "\n${green}Bringing up Bankong application.${normal}\n"
# docker compose -f $COURSEDIR/bankong/docker-compose.yaml up -d
# clear

#App 2
printf "\n${green}Bringing up Mockbin application.${normal}\n"
docker compose -f $COURSEDIR/mockbin/docker-compose.yaml up -d

#App 3
printf "\n${green}Bringing up KongAir application.${normal}\n"
yq eval '.networks["kong-edu-net"].external = true' -i $COURSEDIR/KongAir/docker-compose.yaml
docker compose -f $COURSEDIR/KongAir/docker-compose.yaml up -d

printf "\n${green}Completed Setting up Lab Environment.\n${normal}"
