FROM node:lts
EXPOSE 8080
COPY . /app
WORKDIR /app
RUN npm install
RUN npm rebuild
ENTRYPOINT npm start
