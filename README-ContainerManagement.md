# KongSlides

This project uses Docker to build and run the `kongslides` container, which compiles and serves training materials using the Sensei CLI.

## Build and Push

```bash
VERSION=1.6.1-tmp

# Build the image for multiple platforms
docker buildx build --no-cache --platform linux/amd64,linux/arm64 -t kongslides:$VERSION . --load

# Tag and push to Docker Hub
docker tag kongslides:$VERSION kongedu/kongslides:$VERSION
docker push kongedu/kongslides:$VERSION
```

## Run with Docker Alias

Create an alias for convenience:

```bash
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
```

## Serve Training Material

Serve a specific course:

```bash
kongslides serve --material KGLL-202
```
