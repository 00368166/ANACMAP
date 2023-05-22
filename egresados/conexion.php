<?php
// Datos de conexión a MySQL
$host = 'localhost:3306';
$usuario = 'root';
$contrasena = '';
$base_datos = 'egresados';
// Establecer conexión a la base de datos
$conexion = new mysqli($host, $usuario, $contrasena, $base_datos);
// Verificar si hay errores de conexión
if ($conexion->connect_errno) {
    die("Error en la conexión a la base de datos: " . $conexion->connect_error);
}
?>
