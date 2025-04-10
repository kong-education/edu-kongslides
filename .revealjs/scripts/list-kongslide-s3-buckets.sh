#!/bin/bash 
# set -x 

source ./variables
source ~/.aws-creds


# Check if AWS_ACCESS_KEY_ID is set and not empty
if [[ -n "$AWS_ACCESS_KEY_ID" ]]; then
  if aws s3 ls > /dev/null 2>&1; then
    echo "AWS credentials validated."
  else
    echo "AWS credentials are set, but invalid."
  fi
  else
  echo "AWS_ACCESS_KEY_ID is not set."
fi

echo
aws s3 ls | grep "$BUCKET_PREFIX"

printf "
\nTo remove a bucket use\n"

printf "${GREEN}
aws s3 rb s3://<BUCKET_NAME> --force
${NC}\n\n"