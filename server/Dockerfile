FROM node
EXPOSE 3000
COPY . /app
WORKDIR /app
RUN npm rebuild
ENTRYPOINT npm start