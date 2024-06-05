FROM node:20-slim

WORKDIR /app

# Install OpenSSL
RUN apt-get update && apt-get install -y openssl

COPY ./package.json ./package-lock.json ./
RUN npm install

CMD [ "npm", "run", "dev"]