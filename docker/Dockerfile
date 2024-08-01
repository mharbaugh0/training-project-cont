# Dockerfile
FROM node:20-slim

# Create app directory
WORKDIR /app

# Install dependencies
RUN apt-get update && apt-get install -y openssl

# Install app dependencies
COPY package.json package-lock.json ./

# Copy the entrypoint script
COPY docker/entrypoint.sh /app/docker/entrypoint.sh

# Make the entrypoint script executable
RUN chmod +x /app/docker/entrypoint.sh

# Expose the port Nuxt will run on
EXPOSE ${APP_PORT}

# Use custom entrypoint script
ENTRYPOINT ["./docker/entrypoint.sh"]
