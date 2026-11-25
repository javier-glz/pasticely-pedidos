# Usamos imagen oficial de Node.js en versión 18 (estable)
FROM node:18-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos todo el código del backend
COPY . .

# Exponemos el puerto que usa el servidor (3000)
EXPOSE 3000

# Comando para arrancar el servidor
CMD ["node", "server.js"]
