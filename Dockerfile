FROM node:16.17.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

ENV NODE_ENV=development
ENV PORT=5000
ENV MONGODB_URI="mongodb+srv://lebin642:binbep25112201@cluster0.b5qkn1e.mongodb.net/FD_Database?retryWrites=true&w=majority"

CMD [ "npm", "run", "server" ]