# Tarea 6 - Sistema de Reportes con Data Warehouse

Este proyecto despliega una aplicación web construida con Next.js que consume vistas dinámicas de una base de datos PostgreSQL, optimizada mediante índices y roles de seguridad.

## Requisitos Previos

- Docker Desktop instalado y en ejecución
- Git (para clonar el repositorio)

## Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/Moraaa4/tarea-6.git
cd tarea-6
```

### 2. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto basándote en el archivo `.env.example`:

```bash
cp .env.example .env
```

Luego edita el archivo `.env` y completa los valores necesarios:

```env
POSTGRES_DB=nombre_de_tu_base_de_datos
POSTGRES_PASSWORD=tu_contraseña_segura
DATABASE_URL=postgres://usuario:contraseña@db:5432/nombre_de_tu_base_de_datos
```

**Nota importante:** El archivo `.env` contiene información sensible y **NO** debe ser compartido ni subido al repositorio. Ya está incluido en `.gitignore` para tu seguridad.

### 3. Ejecutar el proyecto

```bash
docker compose up --build
```

La aplicación estará disponible en: `http://localhost:3000`

## Estructura del Proyecto

```
tarea-6/
├── db/                    # Scripts SQL de inicialización
├── lib/                   # Utilidades y conexión a base de datos
├── public/                # Archivos estáticos
├── src/
│   └── app/              # Páginas y componentes de Next.js
├── .env                   # Variables de entorno (NO incluido en el repo)
├── .env.example           # Plantilla de variables de entorno
├── .gitignore            # Archivos ignorados por Git
├── docker-compose.yml     # Configuración de servicios Docker
├── Dockerfile            # Imagen de la aplicación
└── README.md             # Este archivo
```

## Tecnologías Utilizadas

- **Next.js 15** - Framework de React para aplicaciones web
- **TypeScript** - Tipado estático para JavaScript
- **PostgreSQL 15** - Base de datos relacional
- **Docker** - Contenedorización de servicios
- **Tailwind CSS** - Framework de estilos

## Funcionalidades

El sistema incluye reportes dinámicos que consumen las siguientes vistas de la base de datos:

1. **Ventas por Categoría** - Análisis de ventas agrupadas por categoría de producto
2. **Ranking de Clientes** - Clientes ordenados por volumen de compras
3. **Stock en Alerta** - Productos con inventario bajo
4. **Ventas Mensuales** - Tendencias de ventas por mes
5. **Monitor de Estatus** - Estado general de pedidos y productos

## Seguridad

- Las credenciales de la base de datos están protegidas mediante variables de entorno
- El archivo `.env` nunca se sube al repositorio
- Se implementan roles de usuario con permisos específicos en PostgreSQL
- Las consultas SQL están protegidas contra inyecciones

## Servicios Docker

El proyecto utiliza dos servicios:

- **db**: Contenedor de PostgreSQL 15
- **app**: Aplicación Next.js

Los servicios están configurados para comunicarse entre sí a través de la red interna de Docker.

## Notas Adicionales

- La base de datos se inicializa automáticamente con los scripts ubicados en la carpeta `/db`
- El puerto `5432` de PostgreSQL está expuesto para desarrollo local
- La aplicación Next.js corre en el puerto `3000`

## 👤 Autor

Fernando Mora Mercado