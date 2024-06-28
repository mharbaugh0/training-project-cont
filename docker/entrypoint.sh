#!/bin/sh

#Install Dependencies
RUN npm install

# Run Prisma migrations
npx prisma migrate dev

# Start the application
npm run dev
