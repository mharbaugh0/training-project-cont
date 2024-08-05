# Dockerfile
FROM node:20-slim

# Create app directory
WORKDIR /app

# Install dependencies
RUN apt-get update && apt-get install -y openssl && apt-get -y install git

# Install app dependencies
COPY package.json package-lock.json ./

# Copy the entrypoint script
COPY src/docker/entrypoint.sh /app/src/docker/entrypoint.sh

# Make the entrypoint script executable
RUN chmod +x /app/src/docker/entrypoint.sh

# Expose the port Nuxt will run on
EXPOSE ${APP_PORT}

# Use custom entrypoint script
ENTRYPOINT ["./src/docker/entrypoint.sh"]
