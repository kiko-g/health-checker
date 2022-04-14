FROM node:alpine

# Create a directory where our app will be placed
RUN mkdir -p /app
RUN mkdir -p /app/backend

# Change directory so that our commands run inside this new directory
WORKDIR /app/backend

# Copy dependency definitions
COPY package*.json /app/backend

# Install dependecies
RUN npm install

# Get all the code needed to run the app
COPY . /app/backend

# Expose the port the app runs in
EXPOSE 3000

# Serve the app
CMD ["npm", "start"]
