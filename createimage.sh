#!/bin/bash

# This is interim until we have kong/kong-slides
VERSION="kongedu-slides"
REPOSITORY="courses"
OWNER="kong"
IMAGE="$REPOSITORY:$VERSION"

echo running "'docker buildx build --no-cache --platform linux/amd64,linux/arm64 -t $IMAGE . --load'"
read -p "Press enter to continue..."
docker buildx build --no-cache --platform linux/amd64,linux/arm64 -t $IMAGE . --load

echo running "docker tag $IMAGE $OWNER/$IMAGE"
read -p "Press enter to continue..."
docker tag $IMAGE $OWNER/$IMAGE

echo running "docker push  $OWNER/$IMAGE"
read -p "Press enter to continue..."
docker push  $OWNER/$IMAGE
