FROM node:14.10.1-alpine3.10
WORKDIR /server
COPY package.json /server
RUN npm install
RUN npm install -g nodemon
COPY . /server
EXPOSE 3000
CMD ["nodemon"]