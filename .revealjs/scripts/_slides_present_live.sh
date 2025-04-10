#!/bin/bash

# read -p "Enter the COURSE value: " COURSE

## THIS SCRIP CURRENTLY DOESNT WORK AND IS A WIP

COURSE=KGLL-202
CURRENT_CONTAINER=kongslides:1.2

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

kongslides build --material "$COURSE" --slug "$COURSE"

mv "$COURSE/revealjs-output" "$COURSE/revealjs-output.BAK"

if [ -d "dist" ]; then
    mv "dist" "$COURSE/revealjs-output"
fi
