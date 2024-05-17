/*
CREATE TABLE Usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
 */

export const users = [
  {
    id: 'feaac235-335c-4d13-ad71-37a380567e74',
    name: "John Doe",
    email: "john@gmail.com",
    password: '123456'
  },
  {
    id: 'f67dd668-7168-43f1-b763-1c2a6015f6ae',
    name: "Emilia Clarke",
    email: "emilia@gmail.com",
    password: "123456"
  }
];

/*
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
 */

export const tasks = [
  {
    id: '400f3bf6-9a48-4e52-a035-72a89e6e993d',
    user_id: users[0].id,
    title: "Comprar leche",
    description: "Comprar leche en el supermercado",
    state: "pending",
  },
  {
    id: 'a2ce5233-9060-42fc-a36f-89c92f992943',
    user_id: users[0].id,
    title: "Sacar al perro",
    description: "Sacar al perro a pasear por el parque",
    state: "pending",
  },
  {
    id: 'ac8baf2f-a27e-41f3-bb4c-481ed8c08c3b',
    user_id: users[1].id,
    title: "Sacar al perro",
    description: "Sacar al perro a pasear por el parque",
    state: "pending",
  },
  {
    id: 'c1819dff-4ef9-4bfb-800e-dbae93ad7cad',
    user_id: users[1].id,
    title: "Sacar al perro",
    description: "Sacar al perro a pasear por el parque",
    state: "pending",
  },
  {
    id: 'a7fb1360-16f1-41db-8c15-875234c12274',
    user_id: users[1].id,
    title: "Sacar al perro",
    description: "Sacar al perro a pasear por el parque",
    state: "pending",
  }
]



