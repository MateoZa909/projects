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

const projectId = document.getElementById('project_id');
console.log(projectId);

document.getElementById('guardar-btn').addEventListener('click', function(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    // Obtener el token CSRF
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    // Obtener datos del primer formulario
    let proyectoData = {
        nombre_proyecto: document.getElementById('nombre-proyecto').value,
        com_ncode: document.getElementById('empresa').value,
        stf_ncode_incharge: document.getElementById('encargado').value,
        pro_dassignment: document.getElementById('asignacion').value,
        sta_ncode: document.getElementById('estado').value,
        stf_ncode_supervisor: document.getElementById('supervisor').value,
        pro_dstart: document.getElementById('fecha_inicio').value,
        pro_dend: document.getElementById('fecha_fin').value,
    };

    // Obtener datos del segundo formulario (Facturación)
    let facturacionData = Array.from(secondContainer.querySelectorAll('.factura')).map((factura, index) => {
        const mes = secondContainer.querySelectorAll('.content-title-month span')[index].textContent; // Mes del título
        const proyectada = secondContainer.querySelectorAll('.input-projected')[index].value; // Facturación proyectada
        const real = secondContainer.querySelectorAll('.input-real')[index].value; // Facturación real

        return {
            mes, // Mes de facturación
            proyectada: proyectada || '', // Facturación proyectada
            real: real || '' // Facturación real
        };
    });

    // Enviar datos al servidor
    fetch('/proyectos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken // Incluye el token CSRF
        },
        body: JSON.stringify({
            ...proyectoData,
            facturacion: facturacionData // Agregar la facturación al request
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        return response.json();
    })
    .then(data => {
        Swal.fire({
            title: '¡Éxito!',
            text: data.message || 'Proyecto creado con éxito.',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => {
            limpiarFormulario(); // Llama a la función para limpiar los campos después de cerrar el modal
        });;
    })
    .catch(error => {
        console.error('Error al enviar los datos:', error);
        Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al crear el proyecto.',
            icon: 'error',
            confirmButtonText: 'Cerrar'
        });
    });
});
