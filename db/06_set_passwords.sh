#!/bin/bash
# Script para establecer contraseñas de roles usando variables de entor#!/bin/bash
set -e

# Esperar a que PostgreSQL esté listo
# Especificamos la base de datos para evitar errores en los logs
until pg_isready -U "$POSTGRES_USER" -d "$POSTGRES_DB"; do
  sleep 1
done

echo "Estableciendo contraseña para app_user..."

# Ejecutar comando SQL para establecer la contraseña
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    ALTER ROLE app_user WITH PASSWORD '$WEB_USER_PASSWORD';
EOSQL

echo "Contraseña establecida exitosamente"
