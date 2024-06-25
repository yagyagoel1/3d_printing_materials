FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY ./package*.json ./
RUN npm install --only=production

# Change ownership of the working directory
RUN chown -R node:node /usr/src/app

# Switch to the new user
USER node

# Copy built code from the previous stage
COPY  ./src ./src
COPY  ./.env ./
COPY  ./public ./public
# Expose the port
EXPOSE 8000

# Start the application
CMD ["npm", "start"]
