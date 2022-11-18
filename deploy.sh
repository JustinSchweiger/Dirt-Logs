#!/bin/bash

echo "Fetching updates from github ..."
git restore . && git pull

echo "Stopping current pm2 process ..."
pm2 stop "DirtLogs Frontend" && pm2 delete "DirtLogs Frontend"

echo "Installing dependencies ..."
npm install \
    && echo "Starting new pm2 process ..." \
    && pm2 start start.json

