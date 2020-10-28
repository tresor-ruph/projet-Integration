FROM node:9-slim
WORKDIR /server
COPY package.json Server/server
RUN npm install
COPY . Server/server
EXPOSE 3000
CMD ["npm","start"]