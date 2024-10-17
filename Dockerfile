# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# If you are building your code for production, use:
# RUN npm ci --only=production

# Copy the rest of the application files to the container
COPY . .

# Expose the port that the app will run on
EXPOSE 5000

# Define the command to run your app
CMD ["npm","run","dev"]
