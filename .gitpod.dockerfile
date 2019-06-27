FROM gitpod/workspace-full:latest


RUN npm i -g husky \
    && npm i -g generator-jhipster \
    && curl -fsSL https://get.docker.com -o get-docker.sh \
    && sh get-docker.sh \
    && rm get-docker.sh \
    && usermod -a -G docker gitpod
