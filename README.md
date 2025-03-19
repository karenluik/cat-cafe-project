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
DATABASE_URL="mysql://user:password@localhost:3306/cat_cafe_db"
JWT_SECRET="your-secret-key"
Tendrás que actualizarlo dependiendo de tu ordenador
3️⃣ Ejecuta migración de la base de datos
> npx prisma migrate dev --name init

4️⃣ Inicializa el servidor backend
> npm run start

NestJS estará ejecutandose en  http://localhost:3000.

🎨 Frontend (Angular)

1️⃣ Instalar Dependencies
> cd frontend
> npm install

2️⃣ Configura las variables de entorno
Actualiza src/environments/environment.ts:
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000'
};

3️⃣ Inicializa la aplicación

> ng serve

Esta aplicación se ejecutará en  http://localhost:4200.

💡 OBSERVACIONES
NO OLVIDES inicializar el backend antes de inicializar el frontend.
Utiliza Postman or Thunder Client para probar los endpoints del API.

