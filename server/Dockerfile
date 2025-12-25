# Node.js server Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Create uploads directory if it doesn't exist
RUN mkdir -p uploads

# Expose port
EXPOSE 8080

# Start the server
CMD ["node", "server.js"]

