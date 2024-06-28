#!/bin/sh

# Run Prisma migrations
npx prisma migrate dev

# Start the application
npm run dev
