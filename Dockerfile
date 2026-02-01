# Imagen de Node
FROM node:20-alpine

# Carpeta donde vivirá la app dentro de Docker
WORKDIR /app

# Copiamos los archivos de configuración
COPY package*.json ./

# Instalamos las librerías necesarias
RUN npm install

# Copiamos el código
COPY . .

# Puerto donde corre Next.js
EXPOSE 3000

# Arranque
CMD ["npm", "run", "dev"]