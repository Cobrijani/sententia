FROM gitpod/workspace-full:latest


RUN npm i -g husky \
    && npm i -g generator-jhipster \
    && curl -fsSL https://get.docker.com -o get-docker.sh \
    && sh get-docker.sh \
    && rm get-docker.sh \
    && curl -L "https://github.com/docker/compose/releases/download/1.24.0/docker-compose-$(uname -s)-$(uname -m)" \
        -o /usr/local/bin/docker-compose
    && chmod +x /usr/local/bin/docker-compose
    && echo "gitpod ALL=NOPASSWD: /usr/bin/docker" >> /etc/sudoers \
    && echo "gitpod ALL=NOPASSWD: /usr/local/bin/docker-compose" >> /etc/sudoers \
    && echo 'Defaults  env_keep += "HOME"' >> /etc/sudoers \
    && apt-get clean
