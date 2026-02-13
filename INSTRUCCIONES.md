# Instrucciones Importantes

## ⚠️ Instalación de Dependencias

Las dependencias de Node.js deben instalarse **dentro de la carpeta `frontend/`**, NO en la raíz del proyecto.

### Primera vez instalando dependencias:

```bash
cd frontend
npm install
```

Esto creará:
- `frontend/node_modules/` - Dependencias de Node.js
- `frontend/.next/` - Build de Next.js (generado al ejecutar o construir)

### Con Docker (recomendado):

Al usar Docker, **NO necesitas** instalar las dependencias manualmente. El Dockerfile se encarga de todo:

```bash
docker compose build
docker compose up
```

## 📁 Estructura Esperada

```
tarea-6/
├── frontend/
│   ├── node_modules/    ← Aquí van las dependencias
│   ├── .next/           ← Aquí va el build de Next.js
│   ├── src/
│   ├── lib/
│   └── package.json
├── db/
├── .env
└── docker-compose.yml
```

## ❌ NO hacer esto:

```bash
# NO instalar dependencias en la raíz
npm install  # ❌ INCORRECTO
```

## ✅ Hacer esto:

```bash
# Instalar dependencias en frontend
cd frontend
npm install  # ✅ CORRECTO
```

O mejor aún, usar Docker:

```bash
docker compose up --build  # ✅ RECOMENDADO
```
