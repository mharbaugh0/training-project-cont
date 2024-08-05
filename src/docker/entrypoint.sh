#!/bin/sh

#Enable git usage in the container
git config --global --add safe.directory /app

#Install Dependencies
npm install

# Run Prisma migrations
npx prisma migrate dev

# Start the application
npm run dev
