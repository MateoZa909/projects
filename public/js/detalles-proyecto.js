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
                // Crear un FormData para manejar correctamente los archivos y datos del formulario
                let formData = new FormData(document.getElementById('project-details-form')); // Creamos un FormData del formulario principal

                // Inicializa el array para almacenar los datos de facturación
                let facturacionData = [];
                let tiemposData = [];

                // Recoger datos de facturación del DOM
                $('.second-container .colu').each(function (index) {
                    // Aquí estamos capturando el mes y el año de cada fila
                    const bil_month = $(this).find('span.mes-año').text();
                    const bil_projected = $(this).find('.input-projected').val();
                    const bil_real = $(this).find('.input-real').val();

                    console.log(`Mes-Año: ${bil_month}, Proyectado: ${bil_projected}, Real: ${bil_real}`);

                    // Agregar los datos al array de facturación
                    facturacionData.push({
                        bil_month: bil_month,
                        bil_projected: bil_projected || 0, // Evitar valores vacíos
                        bil_real: bil_real || 0 // Evitar valores vacíos
                    });

                    // También agregamos estos valores al formData
                    formData.append(`facturacion[${index}][bil_month]`, bil_month);
                    formData.append(`facturacion[${index}][bil_projected]`, bil_projected || 0);
                    formData.append(`facturacion[${index}][bil_real]`, bil_real || 0);
                });

                console.log('Datos de facturación listos para enviar:', facturacionData);

                // ********************************
                // Tiempos

                $('#times .colu-tiempos').each(function (index) {
                    // Capturando los valores para cada fila de tiempos
                    const tim_month = $(this).find('span.mes-año-tiempos').text(); // Mes-Año en formato 'MMM-YYYY'
                    const tim_projected = $(this).find('.input-projected-tiempos').val(); // Proyectado
                    const tim_real = $(this).find('.input-real-tiempos').val(); // Real

                    console.log(`Mes-Año: ${tim_month}, Proyectado: ${tim_projected}, Real: ${tim_real}`);

                    // Agregar los datos al array de tiempos
                    tiemposData.push({
                        tim_month: tim_month,
                        tim_projected: tim_projected || 0, // Evitar valores vacíos
                        tim_real: tim_real || 0 // Evitar valores vacíos
                    });

                    // También agregamos estos valores al formData
                    formData.append(`tiempos[${index}][tim_month]`, tim_month);
                    formData.append(`tiempos[${index}][tim_projected]`, tim_projected || 0);
                    formData.append(`tiempos[${index}][tim_real]`, tim_real || 0);
                });

                console.log('Datos de tiempos listos para enviar:', tiemposData);

                for (let pair of formData.entries()) {
                    console.log(pair[0] + ': ' + pair[1]);
                }

                // Enviar la solicitud AJAX con FormData
                $.ajax({
                    url: "/proyectos", // Ruta donde se envían los datos
                    method: "POST",
                    data: formData,
                    processData: false,  // Necesario para enviar FormData correctamente
                    contentType: false,  // Necesario para enviar FormData correctamente
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
