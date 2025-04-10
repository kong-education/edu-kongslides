#!/bin/bash 
# set -x 

cd $REVEALJS_DIR 
source scripts/variables
source ~/.aws-creds
export BUCKET_NAME=$1
export SLIDES_DIR=$2

# Check if a bucket name was passed in is unset or empty
if [ -z "$1" ]; then
  read -p "Which course slides do you want to upload: " COURSE
  # BUCKET_NAME=$COURSE-slides | tr '[:upper:]' '[:lower:]'
  BUCKET_NAME="$BUCKET_PREFIX"-"$(echo $COURSE-slides | tr '[:upper:]' '[:lower:]')"
  SLIDES_DIR="$COURSE-slides"
fi

# Static for testing/overrides
# Reusing the name bucket name causes queueing issues in AWS
# RANDOMER=$(echo $((1 + $RANDOM % 100)))
# export BUCKET_NAME="$BUCKET_NAME-$RANDOMER"

# Check if AWS_ACCESS_KEY_ID is set and not empty
if [[ -n "$AWS_ACCESS_KEY_ID" ]]; then
  if aws s3 ls > /dev/null 2>&1; then
    echo "AWS credentials validated."
  else
    echo "AWS credentials are set, but invalid."
    exit 0
  fi
  else
  echo "AWS credentials are not set."
  exit 0
fi

echo uploading to S3 bucket "$BUCKET_NAME" in "$REGION"
# pwd = /Users/john.fitzpatrick@konghq.com/GitHub/edu-strigo-courses/.revealjs

# Create the S3 bucket
# aws s3api create-bucket --bucket "$BUCKET_NAME" --region "$REGION" --create-bucket-configuration LocationConstraint="$REGION"
aws s3api create-bucket --bucket $BUCKET_NAME --region $REGION --create-bucket-configuration LocationConstraint=$REGION > /dev/null 2>&1
sleep 2

envsubst < scripts/aws-artifacts/bucket-policy-template.json > bucket-policy.json

# Enable static website hosting
aws s3 website "s3://$BUCKET_NAME" --index-document index.html --error-document error.html

# Enable public access & bucket policy settings
aws s3api put-public-access-block --bucket "$BUCKET_NAME" --public-access-block-configuration file://scripts/aws-artifacts/public-access.json 
aws s3api put-bucket-policy --bucket "$BUCKET_NAME" --policy file://bucket-policy.json
rm bucket-policy.json

# Copy slides to repo
aws s3 cp $OUTPUT_DIR/$SLIDES_DIR s3://$BUCKET_NAME --recursive

printf "\n${GREEN}The slide's static content are now available at: 

http://$BUCKET_NAME.s3-website-$REGION.amazonaws.com ${NC}\n\n"

printf "To remove a bucket use\n"

printf "${GREEN}
aws s3 rb s3://$BUCKET_NAME --force
${NC}\n\n"

