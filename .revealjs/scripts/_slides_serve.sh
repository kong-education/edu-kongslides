#!/bin/bash

CURRENT_CONTAINER=kongedu/kongslides:1.2

alias kongslides='docker container run \
   --interactive \
   --tty \
   --rm \
   --volume $(pwd):/$(basename $(pwd)) \
   --workdir /$(basename $(pwd)) \
   --publish ${SENSEI_PORT:-8080}:${SENSEI_PORT:-8080} \
   --env SENSEI_PORT \
   --env SENSEI_WATCH_POLL \
   --cap-add=SYS_ADMIN \
   $CURRENT_CONTAINER'

kongslides serve --material KGLL-202



# kongslides build --material KGLL-202
