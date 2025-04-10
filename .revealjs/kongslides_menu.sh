#!/bin/bash

source ./scripts/variables
 
PS3='Please select an option: '
lessons=(
    "Display course slides locally from repo"
    "Generate slides & PDFs for a specific course"
    "Generate slides for all courses (TBD)"
    "Upload slides to S3"
    "List all Kongslides S3 buckets"
    "Configure local laptop for Kongslides"
    "Quit"
    )
COLUMNS=12

select opt in "${lessons[@]}"
do
    case $opt in
        "Display course slides locally from repo")
            cd $REVEALJS_DIR/scripts
            . ./slides-serve.sh
            cd $REVEALJS_DIR
            exit 0
            ;;
        "Generate slides & PDFs for a specific course")
            cd $REVEALJS_DIR/scripts
            . ./slides-generate-static-single.sh
            cd $REVEALJS_DIR
            exit 0
            ;;
        "Generate slides for all courses (TBD)")
            cd $REVEALJS_DIR/scripts
            . ./slides-generate-static-all.sh
            cd $REVEALJS_DIR
            exit 0
            ;;
        "Upload slides to S3")
            cd $REVEALJS_DIR/scripts
            . ./slides-upload-to-s3.sh
            cd $REVEALJS_DIR
            exit 0
            ;;
        "List all Kongslides S3 buckets")
            cd $REVEALJS_DIR/scripts
            . ./list-kongslide-s3-buckets.sh
            cd $REVEALJS_DIR
            exit 0
            ;;
        "Configure local laptop for Kongslides")
            cd $REVEALJS_DIR/scripts
            . ./local-setup.sh
            cd $REVEALJS_DIR
            exit 0
            ;;
        "Quit")
            break
            ;;
        *) echo "invalid option $REPLY";;
    esac
done

