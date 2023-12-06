FROM node:lts-alpine

# set the working direction
WORKDIR /app

# install app dependencies
COPY package.json ./
COPY package-lock.json ./

# Fix permissions for packages
# RUN npm config set unsafe-perm true

RUN npm install
RUN npm install -g serve

# Bundle app source
COPY . .
RUN npm run build

# start app
EXPOSE 49160
CMD ["serve", "-s", "dist/", "-l", "49160"]