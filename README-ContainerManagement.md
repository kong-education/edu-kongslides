<!-- VERSION=1.7.1  # New Branding -->
<!-- VERSION=1.7.2  # Including mermaid and copy-code (but this is switched off) -->
<!-- VERSION=1.7.3  # Includes Chuca's branding -->
VERSION=1.7.4 # 1.7.3 + Mermaid themed per slide: light edges/arrows on dark slides (see below)

<!-- docker buildx build --no-cache --platform linux/amd64,linux/arm64 -t kongslides:$VERSION . --load -->
docker buildx build --platform linux/amd64,linux/arm64 -t kongslides:$VERSION . --load
docker tag kongslides:$VERSION kongedu/kongslides:$VERSION
# docker push kongedu/kongslides:$VERSION # This repo has been removed from Docker Hub


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








## Mermaid colours (1.7.4+)

Diagrams are themed per slide when they render, so connectors and arrowheads stay
visible on the dark background without touching the slide markdown:

- `src/app/slides/slides.js` — `mermaidBeforeRender` (wired in through
  `reveal.initialize({ mermaidPlugin })`) checks the slide's theme class. On
  `theme-dark` (the default) it prepends a Mermaid `%%{init}%%` directive with
  `theme: base` and the light palette in `MERMAID_DARK_VARS`. On `theme-electric`,
  `theme-bay` and `theme-white` it does nothing, so those render exactly as Mermaid's
  default theme. A slide with no theme class falls back to the luminance of its `--bg`.
- A diagram that already sets its own config (an `%%{init}%%` directive or `---`
  frontmatter) keeps it.
- `src/app/slides/kong.css` — sequence-diagram lifelines can't be reached through
  theme variables, so they are restyled under `.theme-dark`.
- The PDF build (`slides-pdf.js`) imports `slides.js`, so PDFs, and the PNGs, video
  frames and SCORM output made from them, get the same colours.

Known Mermaid limitation: sequence diagrams all use the fixed marker id `arrowhead`, and
every `url(#arrowhead)` on a page resolves to the first one. A deck that mixes light-
and dark-slide sequence diagrams can therefore show the first diagram's arrowhead colour
on the others. Flowcharts are not affected.

Rebuild the image after editing either file, then bump `kongslides_version` in keductl's
`config.toml`.
