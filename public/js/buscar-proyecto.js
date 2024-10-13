jQuery(document).ready(function() {
    let timer; // Temporizador para retrasar la búsqueda

    // Detectar cuando el usuario escribe en el input de búsqueda
    jQuery('#btn-buscar').on('keyup', function() {
        console.log('Search triggered');
        clearTimeout(timer); // Limpiar el temporizador anterior
        let searchQuery = jQuery(this).val().trim(); // Obtener el valor del input y eliminar espacios

        console.log(typeof jQuery); // Debería mostrar "function"
        console.log(jQuery.fn.jquery); // Debería mostrar la versión de jQuery (por ejemplo, "3.6.0")

        timer = setTimeout(function() {
            // Solo realizar la petición si hay texto de búsqueda
            if (searchQuery !== '') {
                jQuery.ajax({
                    url: '/proyectos/creados', // Ruta al controlador
                    method: 'GET',
                    data: { search: searchQuery },
                    beforeSend: function() {
                        // Mostrar un mensaje de "Cargando..."
                        jQuery('#lista-proyectos').html('<p>Cargando proyectos...</p>');
                    },
                    success: function(response) {
                        // Limpiar el div de resultados antes de actualizar
                        jQuery('#lista-proyectos').empty();

                        // Si hay proyectos, iterarlos y mostrarlos
                        if (response.proyectos.length > 0) {
                            jQuery.each(response.proyectos, function(index, proyecto) {
                                jQuery('#lista-proyectos').append(`
                                    <div class="proyecto col-md-3">
                                        <i id="list" class="fa-regular fa-rectangle-list" style="color: #000;"></i>
                                        <span>${index + 1} - ${proyecto.PRO_CNAME.toUpperCase()}</span>
                                    </div>
                                `);
                            });
                        } else {
                            // Si no se encuentran proyectos, mostrar un mensaje
                            jQuery('#lista-proyectos').append('<p>No se encontraron proyectos.</p>');
                        }
                    },
                    error: function() {
                        // Mostrar un mensaje de error en caso de fallo en la petición
                        jQuery('#lista-proyectos').html('<p>Hubo un error al buscar proyectos. Por favor, intenta de nuevo.</p>');
                    }
                });
            } else {
                // Limpiar resultados si no hay texto de búsqueda
                jQuery('#lista-proyectos').empty();
            }
        }, 300); // Retraso de 300ms antes de realizar la búsqueda
    });
});

// Esto debe estar antes del script para evitar conflictos
jQuery.noConflict();

