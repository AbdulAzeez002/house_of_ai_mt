# Use the official Node.js image with the latest LTS version
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /src

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the TypeScript code
RUN npm run build

# Set the command to start the app
CMD ["node", "dist/index.js"]
