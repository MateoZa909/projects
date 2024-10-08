$(document).ready(function () {
    $('#guardar-btn').on('click', function () {
        // Mostrar un Swal de confirmación antes de enviar el formulario
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡Asegúrate de que todos los datos sean correctos!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, guardar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Si el usuario confirma, preparamos los datos
                let formData = $('#project-details-form').serializeArray(); // Serializamos los datos del formulario
                let facturacionData = []; // Array para los datos de facturación

                // Recoger datos de facturación del DOM
                $('.second-container .colu').each(function () {
                    const bil_month = $(this).find('span[name="bil_month"]').text(); // Obtener el mes
                    const bil_projected = $(this).find('.input-projected').val(); // Obtener el valor proyectado
                    const bil_real = $(this).find('.input-real').val(); // Obtener el valor real

                    // Agregar los datos al array de facturación
                    facturacionData.push({
                        bil_month: bil_month,
                        bil_projected: bil_projected,
                        bil_real: bil_real,
                    });
                });

                // Agregar los datos de facturación al formData
                formData.push({ name: 'facturacion', value: JSON.stringify(facturacionData) });

                // Enviar la solicitud AJAX
                $.ajax({
                    url: "/proyectos", // Ruta donde se envían los datos
                    method: "POST",
                    data: formData,
                    success: function (response) {
                        // Mostrar mensaje de éxito
                        Swal.fire({
                            icon: 'success',
                            title: '¡Proyecto guardado con éxito!',
                            text: 'El proyecto ha sido creado correctamente.',
                        }).then(() => {
                            location.reload(); // Recargar la página o redirigir si lo prefieres
                        });
                    },
                    error: function (xhr) {
                        // Manejar errores de validación
                        if (xhr.status === 422) {
                            let errors = xhr.responseJSON.errors;
                            let errorList = '';
                            $.each(errors, function (key, value) {
                                errorList += '<li>' + value[0] + '</li>';
                            });

                            Swal.fire({
                                icon: 'error',
                                title: 'Errores en el formulario',
                                html: '<ul>' + errorList + '</ul>',
                            });
                        } else {
                            // Otro tipo de error
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: 'Ocurrió un error al intentar guardar el proyecto.',
                            });
                        }
                    }
                });
            }
        });
    });
});
