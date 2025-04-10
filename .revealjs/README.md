# About 

Reveal.js tools are managed in [edu-kongslides](https://github.com/kong-education/edu-kongslides), forked from Zenika's Sensei Project https://github.com/Zenika/sensei


# Managing Content

To generate static content and upload to S3, run `./kongslides-menu.sh` from within the `edu-strigo-courses/.revealjs` directory

```
 ✗ ./kongslides-menu.sh
1) Generate slides for a specific course
2) Generate slides for all courses
3) Upload slides to S3
4) List all S3 buckets used for Kongslides
5) Quit
```

To use dynamic content, then do this

# Serve content using npm

npm start -- build --material=KGLL-202

# Serve content using docker

1. Set Alias

   ```
   $ alias kongslides='docker container run \
      --interactive \
      --tty \
      --rm \
      --volume $(pwd):/$(basename $(pwd)) \
      --workdir /$(basename $(pwd)) \
      --publish ${SENSEI_PORT:-8080}:${SENSEI_PORT:-8080} \
      --env SENSEI_PORT \
      --env SENSEI_WATCH_POLL \
      --cap-add=SYS_ADMIN \
      kongedu/kongslides:1.3'
   ```

2. Serve the slide content from `~/edu-strigo-courses`

   ```
   $ cd ~/edu-strigo-courses

   $ kongslides serve --material KGLL-202
   Processing folder '/edu-strigo-courses/KGLL-202' as 'KGLL-202' using slide size 1420x800 and language 'en'
   <i> [webpack-dev-server] Project is running at:
   <i> [webpack-dev-server] Loopback: http://localhost:8080/
   <i> [webpack-dev-server] On Your Network (IPv4): http://172.17.0.2:8080/
   <i> [webpack-dev-server] Content not from webpack is served from '/edu-strigo-courses/public' directory
   26 assets
   130 modules
   webpack 5.94.0 compiled successfully in 1281 ms
   ```

   Alternatively, serve directory from the course folder

   ```
   $ cd ~/edu-strigo-courses/KGLL-202

   $ kongslides serve
   Processing folder '/KGLL-202' as 'KGLL-202' using slide size 1420x800 and language 'en'
   fatal: not a git repository (or any parent up to mount point /)
   Stopping at filesystem boundary (GIT_DISCOVERY_ACROSS_FILESYSTEM not set).
   <i> [webpack-dev-server] Project is running at:
   <i> [webpack-dev-server] Loopback: http://localhost:8080/
   <i> [webpack-dev-server] On Your Network (IPv4): http://172.17.0.2:8080/
   <i> [webpack-dev-server] Content not from webpack is served from '/KGLL-202/public' directory
   25 assets
   129 modules
   webpack 5.94.0 compiled successfully in 1067 ms
   ```

# Create PDFS

```
$ cd ~/edu-strigo-courses
$ kongslides pdf --material KGLL-202
```

# build static site using docker
```
$ kongslides build --material KGLL-202
```


## Container Image Management

See https://github.com/kong-education/edu-kongslides/tree/jhn/first-kong-poc 

```
docker tag kongslides:1.3 kongedu/kongslides:1.3
docker push kongedu/kongslides:1.3
```
