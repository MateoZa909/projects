// POST para ruta /proyectos
$(document).ready(function() {
    $('#guardar-btn').on('click', function() {
        if ($('#project-details-form')[0].checkValidity()) {
            $.ajax({
                url: $('#project-details-form').attr('action'),
                type: 'POST',
                data: $('#project-details-form').serialize(),
                success: function(response) {
                    $('#project_id').val(response.project_id);

                    // Mostrar un mensaje de éxito
                    Swal.fire({
                        icon: 'success',
                        title: 'Éxito',
                        text: 'El proyecto se ha guardado correctamente.',
                    });

                    // Aquí puedes habilitar otros formularios si es necesario
                },
                error: function(xhr) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Hubo un problema al guardar el proyecto.',
                    });
                }
            });
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: 'Por favor, completa todos los campos requeridos.',
            });
        }
    });
});
