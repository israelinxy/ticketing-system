# 🎟️ Sistema de Tickets

Sistema de gestión de tickets construido con Node.js y Express.js. Este proyecto permite a los usuarios crear, ver y gestionar tickets de soporte, facilitando la comunicación entre clientes y el equipo de soporte.

## Características

- ✅ Creación de tickets
- 📜 Visualización de tickets
- 🔄 Actualización del estado de los tickets
- 🌐 API RESTful para la gestión de tickets
- 🛡️ Seguridad mejorada con Helmet y rate limiting

## Tecnologías Utilizadas

- ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=Node.js&logoColor=white)
- ![Express.js](https://img.shields.io/badge/Express.js-404D59?logo=express&logoColor=white)
- ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
- ![Mongoose](https://img.shields.io/badge/Mongoose-880000?logo=mongoose&logoColor=white)


## Requisitos Previos

Asegúrate de tener instalados los siguientes programas en tu máquina:

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [MongoDB](https://www.mongodb.com/) (local o en la nube)

## Instalación

Sigue estos pasos para configurar el proyecto en tu entorno local:

1. Clona el repositorio:

   ```bash
   git clone https://github.com/israelinxy/ticketing-system.git
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd ticketing-system
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Configura las variables de entorno. Crea un archivo `.env` en la raíz del proyecto y añade lo siguiente:

   ```plaintext
   MONGODB_URI=tu_uri_de_mongodb
   PORT=3000
   ```

5. Inicia el servidor:

   ```bash
   npm start
   ```

6. Abre tu navegador y visita `http://localhost:3000` para ver la aplicación en acción.

## Uso

Una vez que el servidor esté en funcionamiento, puedes interactuar con la API a través de herramientas como Postman o cURL. Aquí hay algunos ejemplos de cómo utilizar la API:

### Crear un Ticket

```http
POST /api/tickets
Content-Type: application/json

{
  "titulo": "Problema con el producto",
  "descripcion": "No puedo acceder a mi cuenta."
}
```

### Obtener Todos los Tickets

```http
GET /api/tickets
```

### Actualizar un Ticket

```http
PUT /api/tickets/:id
Content-Type: application/json

{
  "estado": "resuelto"
}
```

## Scripts

El proyecto incluye varios scripts útiles que puedes ejecutar desde la línea de comandos:

- `npm start`: Inicia el servidor en modo producción.
- `npm run dev`: Inicia el servidor en modo desarrollo con recarga automática.
- `npm test`: Ejecuta las pruebas utilizando Jest.
- `npm run db:populate`: Puebla la base de datos con datos iniciales.

## Dependencias

Este proyecto utiliza las siguientes dependencias:

### Dependencias Principales

- **bcrypt**: Para el hash seguro de contraseñas.
- **compression**: Middleware para comprimir las respuestas HTTP.
- **cors**: Middleware para habilitar CORS.
- **dotenv**: Para manejar variables de entorno.
- **express**: Framework web para Node.js.
- **express-rate-limit**: Para limitar las solicitudes a la API.
- **helmet**: Para proteger aplicaciones Express estableciendo cabeceras HTTP seguras.
- **jsonwebtoken**: Para manejar autenticación basada en tokens.
- **mongoose**: Para interactuar con MongoDB.
- **uuid**: Para generar identificadores únicos universales.
- **winston**: Para registrar eventos y errores.

### Dependencias de Desarrollo

- **@babel/core**, **@babel/preset-env**: Para transpilar código moderno a versiones compatibles con Node.js.
- **jest**: Framework para pruebas unitarias.
- **joi**: Para validación de datos.
- **morgan**: Middleware para registrar solicitudes HTTP.
- **supertest**: Para realizar pruebas HTTP.

## Contribuciones 🤝

Las contribuciones son bienvenidas. Para problemas, ideas o nuevas características, por favor abre un issue o un pull request.

## Contacto 📫

¿Necesitas un diseño web personalizado? Contáctame:

[![Gmail](https://img.shields.io/badge/Email%20personal-white?style=for-the-badge&logo=gmail&logoColor=white&label=israelcolladom%40gmail.com&labelColor=black&color=%23EA4335)](mailto:israelcolladom@gmail.com)

## Licencia 📜
