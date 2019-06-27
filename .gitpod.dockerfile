FROM gitpod/workspace-full:latest


RUN npm i -g husky \
    && npm i -g generator-jhipster
