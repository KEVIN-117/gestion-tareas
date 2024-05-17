# Servidor de Aplicaciones

## El stack de tecnologías es PEAN

- `P`ostgreSQL: Base de datos relacional.
- `E`xpress: Framework de Node.js para construir APIs.
- `R`eact: Framework de JavaScript para construir aplicaciones web.
- `N`ode.js: Entorno de ejecución de JavaScript para el lado del servidor.

## Requisitos

- Node.js
- Angular CLI
- PostgreSQL: Para ejecutar la base de datos en un contenedor, esta base de datos se usara en la etapa de desarrollo.
- Docker: Para ejecutar la base de datos en un contenedor, esta base de datos se usara ern la etapa de desarrollo.

## Las Tecnologias o dependencias de nuestro proyecto son:

- `express`: Framework de Node.js para construir APIs.
- `pg`: Cliente de PostgreSQL para Node.js.
- `cors`: Middleware de Express para habilitar CORS.
- `morgan`: Middleware de Express para registrar las solicitudes HTTP.
- `jwt`: Librería para generar y verificar tokens JWT.
- `bcrypt`: Librería para cifrar contraseñas.
- `uuid`: Librería para generar identificadores únicos.
- `slint`: Herramienta para analizar el código fuente en busca de errores y malas prácticas.
- `pretier`: Herramienta para formatear el código fuente de manera consistente.
- `husky`: Herramienta para ejecutar scripts de npm en respuesta a eventos de Git.
- `zod`: Librería para validar los datos de entrada en las solicitudes HTTP.


## Versiones recomendada de node

- Node.js: v22.0.0 o superior

## Acripts de npm

- `start`: Inicia el servidor de aplicaciones en modo de producción.
- `dev`: Inicia el servidor de aplicaciones en modo de desarrollo.
- `lint`: Analiza el código fuente en busca de errores y malas prácticas.
- `format`: Formatea el código fuente de manera consistente.
- `test`: Ejecuta las pruebas unitarias y de integración.

## Estructura del proyecto

```text
project-root/
│
├── src/
│   ├── controllers/
│   │   ├── UserController.js
│   │   └── OtherController.js
│   │
│   ├── models/
│   │   ├── UserModel.js
│   │   └── OtherModel.js
│   │
│   ├── services/
│   │   ├── UserService.js
│   │   └── OtherService.js
│   │
│   ├── repositories/
│   │   ├── UserRepository.js
│   │   └── OtherRepository.js
│   │
│   ├── routes/
│   │   ├── userRoutes.js
│   │   └── otherRoutes.js
│   │
│   ├── middlewares/
│   │   └── authMiddleware.js
│   │
│   ├── utils/
│   │   ├── validation.js
│   │   └── helpers.js
│   │
│   └── app.js
│
├── config/
│   ├── config.js
│   └── database.js
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
└── package.json
|__ .gitignore
|__ .eslintrc.json
|__ .prettierrc.json
|__ .huskyrc.json
|__ .env
|__ docker-compose.yml
```

## diseño de la base de datos

1. **Tabla de Usuarios**: Esta tabla almacenará la información de los usuarios.
2. **Tabla de Tareas**: Esta tabla almacenará las tareas y estará relacionada con la tabla de usuarios mediante una clave foránea.

### Esquema de la Base de Datos

#### Tabla `Usuarios`

| Campo          | Tipo de Datos  | Descripción                            |
|----------------|----------------|----------------------------------------|
| id             | INT            | Clave primaria, autoincremental        |
| nombre         | VARCHAR(100)   | Nombre del usuario                     |
| email          | VARCHAR(100)   | Correo electrónico del usuario (único) |
| password       | VARCHAR(255)   | Contraseña del usuario, encriptada     |
| fecha_creacion | TIMESTAMP      | Fecha de creación de la cuenta         |

#### Tabla `Tareas`

| Campo             | Tipo de Datos   | Descripción                                     |
|-------------------|-----------------|-------------------------------------------------|
| id                | INT             | Clave primaria, autoincremental                 |
| usuario_id        | INT             | Clave foránea hacia `Usuarios.id`               |
| titulo            | VARCHAR(255)    | Título de la tarea                              |
| descripcion       | TEXT            | Descripción de la tarea                         |
| fecha_creacion    | TIMESTAMP       | Fecha de creación de la tarea                   |
| fecha_vencimiento | TIMESTAMP       | Fecha de vencimiento de la tarea                |
| estado            | VARCHAR(50)     | Estado de la tarea (pendiente, completada)      |

### Relaciones

- **Usuarios (1) --- (N) Tareas**: Un usuario puede tener muchas tareas, pero una tarea solo pertenece a un usuario.

### Seguridad
- **Autenticación y Autorización**: Asegúrate de implementar un sistema robusto de autenticación (por ejemplo, utilizando JWT o sesiones) para que los usuarios solo puedan acceder a sus propias tareas.
- **Encriptación de Contraseñas**: Las contraseñas deben ser encriptadas usando un algoritmo seguro como bcrypt.
- **Validación de Datos**: Siempre valida y escapa las entradas del usuario para evitar inyecciones SQL.

### Ejemplo de Implementación en SQL

```sql
CREATE TABLE Usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Tareas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_vencimiento TIMESTAMP,
    estado VARCHAR(50) NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id)
);
```
