<?php
// Incluir el archivo de conexión
include 'conexion.php';

// Obtener el ID del egresado a eliminar desde la solicitud POST
$id = $_POST['id'];

// Consulta SQL para eliminar el egresado
$sql = "DELETE FROM alumnos WHERE id = $id";
$result = $conexion->query($sql);

// Array para almacenar la respuesta de la eliminación
$response = array();

if ($result === TRUE) {
    // Eliminación exitosa
    $response['success'] = true;
} else {
    // Error al eliminar el egresado
    $response['success'] = false;
}

// Cerrar la conexión a la base de datos
$conexion->close();

// Devolver la respuesta en formato JSON
echo json_encode($response);
?>
