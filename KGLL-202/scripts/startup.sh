#!/bin/bash

#================================================#
#       Setting Environment Variables            #
#================================================#
echo "export KONG_GW_VERSION=3.4" >> /home/ubuntu/.envs

#Source the environment variables
source /home/ubuntu/.envs

# This to update $KONG_COURSE_ID if its run from KGIL-201
# See KGIL-201/.menu/.setup_lesson.sh
# Check if a parameter was passed
if [ $# -eq 1 ]; then
    # If no parameter passed, use a default value
    KONG_COURSE_ID=$1
fi

#================================================#
#       Configuring course file structure        #
#================================================#
COURSEDIR="/home/ubuntu/$KONG_COURSE_ID"
mkdir -p "$COURSEDIR"

# Copy the docker compose file that will be used for this course.
cp /tmp/edu-strigo-infra/docker-compose.yaml $COURSEDIR

# Copy the files needed to for the lab
cp -R /tmp/edu-strigo-courses/$KONG_COURSE_ID/scripts/* "$COURSEDIR"
cp -R /tmp/edu-strigo-courses/$KONG_COURSE_ID/artifacts/* "$COURSEDIR"

# Copy any other applications used in the lab.
git clone git@github.com:kong-education/KongAir.git /tmp/KongAir
mkdir -p "$COURSEDIR"/KongAir
cp /tmp/KongAir/docker-compose.yaml /home/ubuntu/$KONG_COURSE_ID/KongAir/
mv $COURSEDIR/kongair-v0.2.yaml $COURSEDIR/KongAir/
docker compose -f $COURSEDIR/KongAir/docker-compose.yaml pull > /dev/null 2>&1 &


# Copy edu-apps required for the lab
# Copy the keycloak configuration files
# mkdir -p "$COURSEDIR"/keycloak
# cp /tmp/edu-strigo-apps/keycloak/* "$COURSEDIR"/keycloak/

# Start mockbin
cp -R /tmp/edu-strigo-apps/mockbin "$COURSEDIR"
docker network create kong-edu-net 
docker compose -f $COURSEDIR/mockbin/docker-compose.yaml pull > /dev/null 2>&1 &

chown -R ubuntu:ubuntu "$COURSEDIR"


#================================================#
#  Configure Docker Files/Kubernetes Manifests   #
#================================================#
 
# Remove all commented out lines so that it easy to read.
sed -i '/^#/d' "$COURSEDIR"/docker-compose.yaml

# Set Network
# The Kong Gateway and KongAir application must run on the same docker network
# Both compose files have the network set to internal
# As KongAir is started first, we need to change the Kong Gateway docker network to an external network
yq eval '.networks["kong-edu-net"].external = true' -i $COURSEDIR/docker-compose.yaml

yq eval '.networks["kong-edu-net"].external = true' -i  $COURSEDIR/KongAir/docker-compose.yaml

# Configure Kong Gateway as required for the course
yq eval '.services["kong-cp"].environment.KONG_ENFORCE_RBAC = "off"' -i $COURSEDIR/docker-compose.yaml
yq eval 'del(.services["kong-cp"].environment.KONG_ADMIN_GUI_AUTH)' -i $COURSEDIR/docker-compose.yaml
yq eval 'del(.services["kong-cp"].environment.KONG_ADMIN_GUI_SESSION_CONF)' -i $COURSEDIR/docker-compose.yaml
yq eval '.services["kong-cp"].environment.KONG_AUDIT_LOG = "off"' -i $COURSEDIR/docker-compose.yaml

# Remove licence from control plane and data plane - added as part of the installation
yq -i 'del(.services.kong-cp.volumes.[] | select(. == "/etc/kong/license.json:/etc/kong/license.json"))'  $COURSEDIR/docker-compose.yaml
yq -i 'del(.services.kong-dp.volumes.[] | select(. == "/etc/kong/license.json:/etc/kong/license.json"))'  $COURSEDIR/docker-compose.yaml

# Set log level
yq eval '.services["kong-cp"].environment.KONG_LOG_LEVEL = "info"' -i $COURSEDIR/docker-compose.yaml
yq eval '.services["kong-dp"].environment.KONG_LOG_LEVEL = "info"' -i $COURSEDIR/docker-compose.yaml

# pull all the docker images needed for the Kong Installation
docker compose -f $COURSEDIR/docker-compose.yaml pull > /dev/null 2>&1 &

#================================================#
#  Pull images for Kong Gateway and other Apps   #
#================================================#

docker compose -f $COURSEDIR/docker-compose.yaml pull > /dev/null 2>&1 &

#================================================#
#  Cleanup                                       #
#================================================#

# rm -rf /home/ubuntu/startup.sh
# rm -rf /tmp/edu-strigo-courses
# rm -rf /tmp/KongAir
# rm -rf /tmp/edu-strigo-apps
touch /home/ubuntu/.initcomplete

