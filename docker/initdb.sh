#!/bin/bash
set -e

# Debugging: Print the environment variables
echo "MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}"
echo "DATABASE_CONTAINER_USERNAME: ${DATABASE_CONTAINER_USERNAME}"
echo "DATABASE_CONTAINER_PASSWORD: ${DATABASE_CONTAINER_PASSWORD}"
echo "MYSQL_DATABASE: ${MYSQL_DATABASE}"

# Validate environment variables
if [ -z "${MYSQL_ROOT_PASSWORD}" ]; then
    echo "Error: MYSQL_ROOT_PASSWORD is not set"
    exit 1
fi

if [ -z "${DATABASE_CONTAINER_USERNAME}" ]; then
    echo "Error: DATABASE_CONTAINER_USERNAME is not set"
    exit 1
fi

if [ -z "${DATABASE_CONTAINER_PASSWORD}" ]; then
    echo "Error: DATABASE_CONTAINER_PASSWORD is not set"
    exit 1
fi

if [ -z "${MYSQL_DATABASE}" ]; then
    echo "Error: MYSQL_DATABASE is not set"
    exit 1
fi

mysql -u root -p"${MYSQL_ROOT_PASSWORD}" <<-EOSQL
    CREATE DATABASE IF NOT EXISTS \`${MYSQL_DATABASE}\`;
    CREATE USER IF NOT EXISTS '${DATABASE_CONTAINER_USERNAME}'@'%' IDENTIFIED BY '${DATABASE_CONTAINER_PASSWORD}';
    GRANT ALL PRIVILEGES ON \`${MYSQL_DATABASE}\`.* TO '${DATABASE_CONTAINER_USERNAME}'@'%';
    FLUSH PRIVILEGES;
EOSQL
