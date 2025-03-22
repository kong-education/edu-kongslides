KONG_COURSE_ID=$(basename "$PWD" | tr '[:upper:]' '[:lower:]')

docker build --no-cache -t $COURSE_ID:1.0 -f Dockerfile .
docker tag $KONG_COURSE_ID:2.0 johnfitzpatrick/$KONG_COURSE_ID:2.0
docker push johnfitzpatrick/$KONG_COURSE_ID:2.0

KONG_COURSE_ID=KGLL-202 && docker run --privileged --rm -e KONG_COURSE_ID="$KONG_COURSE_ID" --name="$KONG_COURSE_ID" --hostname="$KONG_COURSE_ID" -p 8888:8888 -u ubuntu -i -t johnfitzpatrick/kong-edu:2.0
