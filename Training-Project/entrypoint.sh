#!/bin/sh

# Wait for the database to be ready
./wait-for-it.sh db:3306 --timeout=30 --strict -- echo "Database is up"

# Run Prisma migrations
npx prisma migrate dev

# Start the application
npm run dev
