<!-- VERSION=1.7.1  # New Branding -->
VERSION=1.7.2  # Including mermaid and copy-code (but this is switched off)
<!-- docker buildx build --no-cache --platform linux/amd64,linux/arm64 -t kongslides:$VERSION . --load -->
docker buildx build --platform linux/amd64,linux/arm64 -t kongslides:$VERSION . --load
docker tag kongslides:$VERSION kongedu/kongslides:$VERSION
docker push kongedu/kongslides:$VERSION


<!-- docker tag kongslides:$VERSION johnfitzpatrick/kongslides:$VERSION
docker push johnfitzpatrick/kongslides:$VERSION -->


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
   kongslides:$VERSION'

kongslides serve --material KGLL-202


# To share a docker image without going through dockerhub
## Save image to a tar file
docker save kongslides:$VERSION -o kongslides_$VERSION.tar

## Load it on another machine
docker load -i kongslides_$VERSION.tar






