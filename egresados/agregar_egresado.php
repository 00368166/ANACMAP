<?php
// Incluir el archivo de conexión
include 'conexion.php';

// Obtener los datos del egresado desde la solicitud POST
$nombre = $_POST['nombre'];
$anioEgreso = $_POST['anio_egreso'];
$carrera = $_POST['carrera'];
$empresa = $_POST['empresa_actual'];
$puesto = $_POST['puesto_actual'];
$latitud = $_POST['latitud'];
$longitud = $_POST['longitud'];

// Obtener la imagen del egresado
$imagen = $_FILES['foto'];

// Obtener la extensión del archivo de imagen
$extension = strtolower(pathinfo($imagen['name'], PATHINFO_EXTENSION));

// Generar un nombre único para el archivo de imagen
$nombreImagen = uniqid() . '.' . $extension;

// Ruta de la carpeta donde se guardarán las imágenes
$carpetaDestino = './fotos/';

// Ruta completa de la imagen en el servidor
$rutaImagen = $carpetaDestino . $nombreImagen;

// Mover la imagen al directorio de destino
move_uploaded_file($imagen['tmp_name'], $rutaImagen);

// Consulta SQL para insertar los datos del egresado en la base de datos
$sql = "INSERT INTO alumnos (nombre, anio_egreso, carrera, empresa_actual, puesto_actual, latitud, longitud, foto) VALUES ('$nombre', '$anioEgreso', '$carrera', '$empresa', '$puesto', '$latitud', '$longitud', '$nombreImagen')";

// Ejecutar la consulta SQL
$result = $conexion->query($sql);

// Array para almacenar la respuesta del proceso de agregar egresado
$response = array();

if ($result === TRUE) {
    // Agregar egresado exitoso
    $response['success'] = true;
} else {
    // Error al agregar el egresado
    $response['success'] = false;
}

// Cerrar la conexión a la base de datos
$conexion->close();

// Devolver la respuesta en formato JSON
echo json_encode($response);
?>
