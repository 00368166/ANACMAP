<?php
// Incluir el archivo de conexión
include 'conexion.php';
// Consulta SQL para obtener los egresados
$sql = "SELECT * FROM alumnos";
$result = $conexion->query($sql);


// Array para almacenar los datos de los egresados
$egresados = array();

// Recorrer los resultados de la consulta y agregarlos al array de egresados
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $egresados[] = $row;
    }
}

// Cerrar la conexión a la base de datos
$conexion->close();

// Devolver los egresados en formato JSON
echo json_encode($egresados);
?>
