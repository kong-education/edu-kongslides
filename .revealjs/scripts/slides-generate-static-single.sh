#!/bin/bash
# set -x

source ./variables

read -p "Enter a Course Code: " user_input
COURSE_CODE=${user_input:-$DEFAULT_COURSE}

mkdir -p $ARCHIVE_DIR
mkdir -p $OUTPUT_DIR

SLIDES_DIR=$COURSE_CODE-slides

get_slides_datetime() {
  # This function is to get the date/time the previous content was created for archiving reaons
  # Get the first non-total line from ls -l
  local line=$(ls -l $1 | awk 'NR>1 {print; exit}')
  
  # Parse the month, day, and time/year
  local day=$(echo "$line" | awk '{print $6}')
  local month=$(echo "$line" | awk '{print $7}')
  local time_or_year=$(echo "$line" | awk '{print $8}')

  # If time_or_year contains a colon, it's a time (recent file); otherwise it's a year
  if [[ "$time_or_year" == *:* ]]; then
    local time="$time_or_year"
  else
    local time="00:00"  # fallback if only year is shown
  fi
 
  printf "$day$month$YEAR:$time"
}
cd $EDU_COURSE_DIR/.revealjs

if [ -d "$OUTPUT_DIR/$SLIDES_DIR" ]; then
    PREV_VERSION_DATE=$(get_slides_datetime $OUTPUT_DIR/$SLIDES_DIR)
    ARCH_DATE=$(date "+%d%b%Y-%H:%M")
    # Need a better way to identify the date the slides were created and the date they were archived. Maybe a CHANGELOG.txt?
    tar -cvf "$ARCHIVE_DIR"/$SLIDES_DIR_created-$PREV_VERSION_DATE"_"archived-$ARCH_DATE.slides.tar.gz "$OUTPUT_DIR"/"$SLIDES_DIR" > /dev/null 2>&1
    tar -cvf "$ARCHIVE_DIR"/$SLIDES_DIR_created-$PREV_VERSION_DATE"_"archived-$ARCH_DATE..pdf.tar.gz "$OUTPUT_DIR"/"$COURSE_CODE-pdf" > /dev/null 2>&1
    rm -rf "$OUTPUT_DIR/$SLIDES_DIR"
    rm -rf "$OUTPUT_DIR/$COURSE_CODE-pdf"
fi

cwd=$(pwd)
cd $EDU_COURSE_DIR

docker container run --interactive --tty --rm --volume $(pwd):/$(basename $(pwd)) --workdir /$(basename $(pwd)) --publish ${SENSEI_PORT:-8080}:${SENSEI_PORT:-8080} --env SENSEI_PORT --env SENSEI_WATCH_POLL --cap-add=SYS_ADMIN  $KONGSLIDES_IMAGE pdf --material $COURSE_CODE

# Sensei had the output put in 'dist' folder, so we'll move that and rename the folder
mv dist "$OUTPUT_DIR/$SLIDES_DIR"
mv pdf "$OUTPUT_DIR/$COURSE_CODE-pdf"

cd $EDU_COURSE_DIR/.revealjs
cp scripts/aws-artifacts/error.html "$OUTPUT_DIR/$SLIDES_DIR"/

printf "\n\n${GREEN}Slides & PDF have been generated an placed in $OUTPUT_DIR${NC}\n"
printf "${GREEN}The previous version (if any) has been copied to $ARCHIVE_DIR${NC}\n\n"

# printf "${GREEN}If you wish to generate and view the slides on the fly, 'cd' into the '$EDU_COURSE_DIR.revealjs/scripts/code' directory and run the following: 

# npm run dev -- serve --material=../../../KGLL-202 ${NC}\n\n"
BUCKET_NAME="$BUCKET_PREFIX"-"$(echo $SLIDES_DIR-$NOW | tr '[:upper:]' '[:lower:]')"

# # Opening the static content
# url="https://localhost:8080"

# case "$OSTYPE" in
#   linux*)   xdg-open "$url" ;;
#   darwin*)  open "$url" ;;
#   msys*)    start "$url" ;;      # Git Bash
#   cygwin*)  start "$url" ;;
#   win32*)   start "$url" ;;
#   *)        echo "Unsupported OS: $OSTYPE" ;;
# esac


printf "${GREEN}Would you like to push these to an S3 bucket '$BUCKET_NAME' (y/N): ${NC}\n"
read answer

if [[ "$answer" =~ ^[Yy]$ ]]; then
  source scripts/slides-upload-to-s3.sh "$BUCKET_NAME" "$SLIDES_DIR"
else
  exit 0
fi

printf "${GREEN}If you wish to generate and view the slides on the fly, 'cd' into the '$EDU_COURSE_DIR/.revealjs/scripts/code' directory and run the following: 

npm run dev -- serve --material=../../../KGLL-202 ${NC}\n\n"
