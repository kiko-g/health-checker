FROM node:alpine

# Create a directory where our app will be placed
RUN mkdir -p /app
RUN mkdir -p /app/frontend

# Change directory so that our commands run inside this new directory
WORKDIR /app/frontend

# Copy dependency definitions
COPY package*.json /app/frontend

# Install dependecies
RUN npm install

# Get all the code needed to run the app
COPY . /app/frontend

# Expose the port the app runs in
EXPOSE 5000

# Serve the app
CMD ["npm", "start"]
