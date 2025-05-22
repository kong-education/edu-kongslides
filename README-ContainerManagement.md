VERSION=1.6.1-tmp
docker buildx build --no-cache --platform linux/amd64,linux/arm64 -t kongslides:$VERSION . --load
docker tag kongslides:$VERSION kongedu/kongslides:$VERSION
docker push kongedu/kongslides:$VERSION

alias kongslides='docker container run \
   --interactive \
   --tty \
   --rm \
   --volume $(pwd):/$(basename $(pwd)) \
   --workdir /$(basename $(pwd)) \
   --publish ${SENSEI_PORT:-9090}:${SENSEI_PORT:-9090} \
   --env SENSEI_PORT \
   --env SENSEI_WATCH_POLL \
   --cap-add=SYS_ADMIN \
   kongslides:$VERSION'

kongslides serve --material KGLL-202




