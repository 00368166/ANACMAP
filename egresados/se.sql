CREATE DATABASE egresados;

USE egresados;

CREATE TABLE alumnos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  anio_egreso INT,
  nombre VARCHAR(100),
  foto VARCHAR(255),
  carrera VARCHAR(100),
  empresa_actual VARCHAR(100),
  puesto_actual VARCHAR(100),
  latitud DECIMAL(10, 8),
  longitud DECIMAL(11, 8)
);



INSERT INTO alumnos (nombre, latitud, longitud, carrera, empresa_actual, puesto_actual, foto) VALUES
  ('Egresado 1', 40.712776, -74.005974, 'Carrera 1', 'Empresa 1', 'Puesto 1', '1.jpeg'),
  ('Egresado 2', 34.052235, -118.243683, 'Carrera 2', 'Empresa 2', 'Puesto 2', '2.jpeg'),
  ('Egresado 3', 51.507351, -0.127758, 'Carrera 3', 'Empresa 3', 'Puesto 3', '3.jpeg');
