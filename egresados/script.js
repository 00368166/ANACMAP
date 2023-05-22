// Variables globales
let map;
let markers = [];

// Función para inicializar el mapa
function initMap() {
  // Crear un mapa centrado en una ubicación específica
  map = new google.maps.Map(document.getElementById('map-container'), {
    center: { lat: 51.50735100, lng: -0.12775800 }, // Coordenadas de ejemplo, reemplázalas con tus propias coordenadas
    zoom: 12, // Nivel de zoom inicial
  });

  // Llamar a la función para obtener y mostrar los egresados en el mapa
  obtenerEgresados();
}

// Función para obtener los datos de los egresados desde el servidor
function obtenerEgresados() {
  // Realizar la petición AJAX al archivo PHP que obtiene los datos de los egresados
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'obtener_egresados.php', true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        // La petición se completó correctamente
        const egresados = JSON.parse(xhr.responseText);
        console.log('Datos de egresados obtenidos:', egresados);
        mostrarEgresados(egresados);
      } else {
        // Hubo un error al obtener los datos de los egresados
        console.error('Error al obtener los datos de los egresados');
      }
    }
  };
  xhr.send();
}

function mostrarEgresados(egresados) {
  console.log('Mostrando egresados:', egresados);
  // Limpiar los marcadores existentes
  markers.forEach((marker) => {
    marker.setMap(null);
  });
  markers = [];

  // Recorrer la lista de egresados y agregar los marcadores al mapa
  egresados.forEach((egresado) => {
    // Convertir las coordenadas de porcentaje a números decimales
    const latitud = parseFloat(egresado.latitud);
    const longitud = parseFloat(egresado.longitud);

    // Verificar si las coordenadas son válidas
    if (!isNaN(latitud) && !isNaN(longitud)) {
      const position = { lat: latitud, lng: longitud };

      // Crear un marcador en la posición del egresado
      const marker = new google.maps.Marker({
        position: position,
        map: map,
      });

      // Agregar evento click para mostrar la tarjeta de presentación
      marker.addListener('click', () => {
        mostrarTarjeta(egresado);
      });

      // Agregar el marcador a la lista de marcadores
      markers.push(marker);
    } else {
      console.error('Coordenadas inválidas para el egresado:', egresado);
    }
  });
}







function mostrarTarjeta(egresado) {
  // Crear la tarjeta de presentación
  const card = document.createElement('div');
  card.className = 'card';

  const foto = egresado.foto ? `<img src="fotos/${egresado.foto}" alt="Foto de ${egresado.nombre}">` : '';
  const nombre = egresado.nombre ? `<h3>${egresado.nombre}</h3>` : '';
  const egreso = egresado.anio_egreso ? `<p><strong>Año de egreso:</strong> ${egresado.anio_egreso}</p>` : '';
  const carrera = egresado.carrera ? `<p><strong>Carrera:</strong> ${egresado.carrera}</p>` : '';
  const empresa = egresado.empresa_actual ? `<p><strong>Empresa actual:</strong> ${egresado.empresa_actual}</p>` : '';
  const puesto = egresado.puesto_actual ? `<p><strong>Puesto actual:</strong> ${egresado.puesto_actual}</p>` : '';

  card.innerHTML = `
    ${foto}
    ${nombre}
    ${egreso}
    ${carrera}
    ${empresa}
    ${puesto}
    <button class="delete-button">Eliminar</button>
  `;

  // Agregar evento click para eliminar el egresado
  const deleteButton = card.querySelector('.delete-button');
  deleteButton.addEventListener('click', () => {
    const confirmDialogOverlay = document.getElementById('confirm-dialog-overlay');
confirmDialogOverlay.style.display = 'block';

const confirmDeleteButton = document.getElementById('confirm-delete');
confirmDeleteButton.addEventListener('click', () => {
  eliminarEgresado(egresado.id);
  confirmDialogOverlay.style.display = 'none';
});

const cancelDeleteButton = document.getElementById('cancel-delete');
cancelDeleteButton.addEventListener('click', () => {
  confirmDialogOverlay.style.display = 'none';
});

  });

  document.body.appendChild(card);

  // Agregar evento click para cerrar la tarjeta de presentación
  card.addEventListener('click', (event) => {
    if (event.target === card) {
      card.classList.remove('show');
      setTimeout(() => {
        card.remove();
      }, 300);
    }
  });

  // Animación para mostrar la tarjeta de presentación
  setTimeout(() => {
    card.classList.add('show');
  }, 100);
}


// Función para mostrar el cuadro de diálogo de confirmación para eliminar un egresado
function mostrarConfirmacion(egresadoId) {
  const confirmDialogOverlay = document.getElementById('confirm-dialog-overlay');
  const confirmDeleteButton = document.getElementById('confirm-delete');
  const cancelDeleteButton = document.getElementById('cancel-delete');

  confirmDialogOverlay.style.display = 'block';
  confirmDialogOverlay.style.zIndex = '9999'; // Establecer un valor alto para el z-index

  confirmDeleteButton.addEventListener('click', () => {
    eliminarEgresado(egresadoId);
    confirmDialogOverlay.style.display = 'none';
  });

  cancelDeleteButton.addEventListener('click', () => {
    confirmDialogOverlay.style.display = 'none';
  });
}


// Función para eliminar un egresado
function eliminarEgresado(egresadoId) {
  // Realizar la petición AJAX al archivo PHP para eliminar el egresado
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'eliminar_egresado.php', true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        // El egresado se eliminó correctamente
        console.log('Egresado eliminado correctamente');
      } else {
        // Hubo un error al eliminar el egresado
        console.error('Error al eliminar el egresado');
      }
    }
  };
  xhr.send(`id=${egresadoId}`);
  obtenerEgresados();
}
function showAddCardOverlay() {
  const addCardOverlay = document.getElementById("add-card-overlay");
  const mapContainer = document.getElementById("map-container");

  // Reducir el ancho del contenedor del mapa
  mapContainer.style.width = "50%";

  addCardOverlay.style.display = "block";
}


function showAddCardOverlay() {
  const addCardOverlay = document.getElementById('add-card-overlay');
  const mapContainer = document.getElementById('map-container');
  const closeButton = document.getElementById('add-card-close');
  const submitButton = document.getElementById('add-card-submit');

  // Reducir el tamaño del contenedor del mapa
  mapContainer.style.width = '50%';
  mapContainer.style.height = '50%';

  // Mover el contenedor del mapa a la derecha
  mapContainer.style.position = 'absolute';
  mapContainer.style.right = '10px';
  mapContainer.style.top = '10px';

  // Mostrar el overlay y los botones
  addCardOverlay.style.display = 'block';
  closeButton.style.display = 'block';
  submitButton.style.display = 'block';
}

function hideAddCardOverlay() {
  const addCardOverlay = document.getElementById('add-card-overlay');
  const mapContainer = document.getElementById('map-container');
  const closeButton = document.getElementById('add-card-close');
  const submitButton = document.getElementById('add-card-submit');

  // Restaurar el tamaño y posición del contenedor del mapa
  mapContainer.style.width = '100%';
  mapContainer.style.height = '100%';
  mapContainer.style.position = 'static';

  // Ocultar el overlay y los botones
  addCardOverlay.style.display = 'none';
  closeButton.style.display = 'none';
  submitButton.style.display = 'none';
}



// function agregarEgresado() {
//   const nombre = document.getElementById("nombre").value;
//   const egreso = document.getElementById("egreso").value;
//   const carrera = document.getElementById("carrera").value;
//   const empresa = document.getElementById("empresa").value;
//   const puesto = document.getElementById("puesto").value;
//   const foto = document.getElementById("foto").value;

//   // Realizar la lógica para agregar el egresado (enviar los datos al servidor, etc.)

//   // Una vez agregado, puedes cerrar el formulario
//   hideAddCardOverlay();
//     // Una vez agregado, puedes cerrar el formulario
//     hideAddCardOverlay();

//     // Actualizar el mapa
//     obtenerEgresados();
// }

// Llamar a la función para inicializar el mapa cuando se cargue la página
window.onload = function () {
  initMap();
};
