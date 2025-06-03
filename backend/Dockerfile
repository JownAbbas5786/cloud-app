# Use a lightweight Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy only package files first for better caching
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy the rest of your app's source code
COPY . .

# Expose the backend app port
EXPOSE 5000

# Run the server
CMD ["node", "server.js"]
