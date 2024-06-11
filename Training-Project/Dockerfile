# Dockerfile
FROM node:20-slim

# Create app directory
WORKDIR /app

# Install dependencies
RUN apt-get update && apt-get install -y openssl

# Install app dependencies
COPY package.json package-lock.json ./
RUN npm install

# Bundle app source
COPY . .

# Make the entrypoint script
RUN chmod +x /app/entrypoint.sh 

# Expose the port Nuxt will run on
EXPOSE 3000

# Use custom entrypoint script
ENTRYPOINT ["./entrypoint.sh"]
