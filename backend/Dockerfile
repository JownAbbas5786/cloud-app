# Use a Node.js runtime base image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package manifests and install dependencies
COPY package*.json ./
RUN npm install --production

# Bundle app source\COPY . .

# Expose the port your app runs on
EXPOSE 5000

# Start the app
CMD ["node", "server.js"]