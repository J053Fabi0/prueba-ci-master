FROM node:15
# Aquí digo qué versión de node voy a ocupar

WORKDIR /usr/src/app 
# Dónde estará guardando la aplicación

COPY package.json ./

RUN npm install

RUN npm install nodemon -g

COPY . .

EXPOSE 3000

# nodemon -L --watch . server.js
CMD ["nodemon", "-L", "--watch", ".", "server.js"]
