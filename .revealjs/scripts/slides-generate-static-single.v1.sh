#!/bin/bash
# set -x

source ./variables

read -p "Enter a Course Code: " user_input
COURSE_CODE=${user_input:-$DEFAULT_COURSE}

# EDU_COURSE_DIR="$GITHUB_DIR/edu-strigo-courses/"
# ARCHIVE_DIR="$REVEALJS_DIR/archive"
mkdir -p $ARCHIVE_DIR

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

if [ -d "$COURSE_CODE-slides" ]; then
    PREV_VERSION_DATE=$(get_slides_datetime $COURSE_CODE-slides)
    ARCH_DATE=$(date "+%d%b%Y-%H:%M")
    # Need a better way to identify the date the slides were created and the date they were archived. Maybe a CHANGELOG.txt?
    tar -cvf "$ARCHIVE_DIR"/$COURSE_CODE-slides_created-$PREV_VERSION_DATE"_"archived-$ARCH_DATE.tar.gz "$COURSE_CODE-slides" > /dev/null 2>&1
    rm -rf "$COURSE_CODE-slides"
fi

cd scripts/code
# npm start -- build --material=../../../$COURSE_CODE # > /dev/null 2>&
npm start -- build --material=$EDU_COURSE_DIR/$COURSE_CODE # > /dev/null 2>&
# cd ../scripts

# Sensei had the output put in 'dist' folder
cd $EDU_COURSE_DIR/.revealjs
# pwd ; exit 0
mv scripts/code/dist "$COURSE_CODE-slides"
cp scripts/aws-artifacts/error.html "$COURSE_CODE-slides"/

printf "\n\n${GREEN}Slides generated an placed in $(pwd)/$COURSE_CODE-slides${NC}\n"
printf "${GREEN}The previous version (if any) was copied to './archive'${NC}\n\n"

printf "${GREEN}If you wish to generate and view the slides on the fly, 'cd' into the '$EDU_COURSE_DIR.revealjs/scripts/code' directory and run the following: 

npm run dev -- serve --material=../../../KGLL-202 ${NC}\n\n"

BUCKET_NAME="$(echo $COURSE_CODE-slides-$NOW | tr '[:upper:]' '[:lower:]')"

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
  source scripts/slides-upload-to-s3.sh "$BUCKET_NAME" "$COURSE_CODE-slides"
else
  exit 0
fi

printf "${GREEN}If you wish to generate and view the slides on the fly, 'cd' into the '$EDU_COURSE_DIR/.revealjs/scripts/code' directory and run the following: 

npm run dev -- serve --material=../../../KGLL-202 ${NC}\n\n"
