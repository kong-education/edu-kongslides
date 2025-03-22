FROM kong-edu-$KONG_COURSE_I:2.0
# docker build --no-cache -t kong-edu:2.0 -f Dockerfile-kongedu .

COPY  "./assets/strigo_init_deploy_key" "strigo_init_deploy_key"
COPY  "./assets/strigo_init_deploy_key.pub" "strigo_init_deploy_key.pub"
COPY  "./assets/strigo_courses_deploy_key" "strigo_courses_deploy_key"
COPY  "./assets/strigo_courses_deploy_key.pub" "strigo_courses_deploy_key.pub"
COPY  "./assets/strigo_apps_deploy_key" "strigo_apps_deploy_key"
COPY  "./assets/strigo_apps_deploy_key.pub" "strigo_apps_deploy_key.pub"
COPY  "./assets/konglogo.asc" ".asciilogo"

# This is for testing. Slides need to come from edu-strigo-courses/KGLL-xxx
COPY  "./assets/dist-temp" "/tmp/dist-temp"

RUN mkdir -p /etc/ssh/ssh_config.d
RUN touch /etc/ssh/ssh_config.d/kong.conf

