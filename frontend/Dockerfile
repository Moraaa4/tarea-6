# Dockerfile simple para desarrollo
FROM node:20-alpine

WORKDIR /app

# Copiar archivos de configuración de dependencias
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar código fuente
COPY . .

# Exponer puerto
EXPOSE 3000

# Comando de desarrollo
CMD ["npm", "run", "dev"]