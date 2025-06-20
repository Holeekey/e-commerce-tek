FROM node:22.16

# Establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar los archivos de package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY . .

# Compilar el código TypeScript
RUN npm run build

# Exponer el puerto en el que la aplicación escuchará
EXPOSE 5000

# Comando para iniciar la aplicación
CMD ["npm", "run", "prod"]