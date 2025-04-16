docker buildx build --no-cache --platform linux/amd64,linux/arm64 -t kongslides:1.4 . --load
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
   kongslides:1.4'

kongslides serve --material KGLL-202


My directory /foo/ID-pdf/pdf contains two PDF files, and I want to copy them to the dir /foo/ID-slides/. Why does this not work

"cp /foo/ID-pdf/pdf /foo/ID-slides"

