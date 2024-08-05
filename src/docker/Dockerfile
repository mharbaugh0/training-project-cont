# Dockerfile
FROM node:20-slim

# Map host system's user id and group to afs user in container
# So that when we bind mount our files into the container
# we don't get weird permission issues
ARG UID
ARG GID
ARG UNAME=training
ARG UGROUP=training

RUN apt-get update && apt-get install -y openssl && apt-get -y install git && apt-get -y install vim

# Create our user
RUN groupadd -g ${GID} -o ${UGROUP}
RUN useradd -ms /bin/bash -u ${UID} -g ${UGROUP} ${UNAME}

# Create app directory
WORKDIR /app
COPY --chown=${UNAME}:${UGROUP} . .

# Copy the entrypoint script
COPY src/docker/entrypoint.sh /app/src/docker/entrypoint.sh

# Make the entrypoint script executable
RUN chmod +x /app/src/docker/entrypoint.sh

# Install app dependencies
COPY package.json package-lock.json ./

# Expose the port Nuxt will run on
EXPOSE ${APP_PORT}

# Use custom entrypoint script
ENTRYPOINT ["./src/docker/entrypoint.sh"]

USER ${UNAME}


