#!/bin/bash
# set -x

source ./scripts/variables

read -p "Enter a Course Code (e.g. 'KGLL-202'): " user_input
COURSE_CODE=${user_input:-$DEFAULT_COURSE}

cd $EDU_COURSE_DIR
docker container run --interactive --tty --rm --volume $(pwd):/$(basename $(pwd)) --workdir /$(basename $(pwd)) --publish ${SENSEI_PORT:-8080}:${SENSEI_PORT:-8080} --env SENSEI_PORT --env SENSEI_WATCH_POLL --cap-add=SYS_ADMIN $KONGSLIDES_IMAGE serve --material $COURSE_CODE

# cd $REVEALJS_DIR/scripts/code
# npm start -- serve --material=$EDU_COURSE_DIR/$COURSE_CODE # > /dev/null 2>&

# cd $REVEALJS_DIR

