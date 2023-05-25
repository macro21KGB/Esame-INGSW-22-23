# Use a lightweight Node.js base image suitable for running the production build
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the built files from the /dist folder to the container
COPY ./dist .

# Expose the port used by the Vite application
EXPOSE 3000

# Install the serve package globally
RUN npm install -g serve

# Start the serve command to serve the static files
CMD ["serve", "-s", "."]