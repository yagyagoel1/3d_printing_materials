FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY ./package*.json ./
RUN npm install --only=production

# Copy directories
COPY  ./src ./src
COPY  ./.env ./
COPY  ./public ./public

# Change ownership of the working directory and its contents
RUN chown -R node:node /usr/src/app

# Switch to the new user
USER node

# Expose the port
EXPOSE 8000

# Start the application
CMD ["npm", "start"]
