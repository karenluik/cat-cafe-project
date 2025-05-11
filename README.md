# 🐱 Kat Café 

Este es un proyecto **API NestJS** con **Prisma + MySQL** y **frontend en Angular**.  
Permite al usuario crear una cuenta, loguearse y hacer reservas en el cat café.


---

## 🚀 Backend (NestJS + Prisma)

### 1️⃣ Instalar Dependencias

> cd backend

> npm install

2️⃣ Variables de entorno
Crear un archivo .env dentro de la carpeta backend.
Copia y pega esto:
DATABASE_URL_CATS="mysql://root@localhost:3306/db_cat_api" 

DATABASE_URL_CAFE="mysql://root@localhost:3306/cat_cafe_db"

PORT=3000

#jwt
JWT_SECRET=password

JWT_EXPIRES_IN=60m

Tendrás que actualizarlo dependiendo de tu ordenador
3️⃣ Ejecuta migración de la base de datos (tengo dos schemas así que hay que hacerlo dos veces)
> npx prisma generate --schema=prisma/schema_cafe.prisma

> npx prisma generate --schema=prisma/schema_cats.prisma

4️⃣ Inicializa el servidor backend
> npm run start

NestJS estará ejecutandose en  http://localhost:3000.

## 🎨 Frontend (Angular)

### 1️⃣ Instalar Dependencies
> cd frontend
> npm install

2️⃣  Inicializa la aplicación

> npm run start

Esta aplicación se ejecutará en  http://localhost:4200.


