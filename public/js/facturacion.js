document.addEventListener('DOMContentLoaded', function() {
    const guardarBtn = document.getElementById('guardar-btn');
    const fechaInicioInput = document.getElementById('fecha_inicio');
    const fechaFinInput = document.getElementById('fecha_fin');

    // Escuchar cambios en los campos de fecha
    fechaInicioInput.addEventListener('change', generarTablas);
    fechaFinInput.addEventListener('change', generarTablas);

    guardarBtn.addEventListener('click', function() {
        // Lógica adicional al hacer clic en guardar (si es necesario)
    });

    function generarTablas() {
        const fechaInicio = new Date(fechaInicioInput.value);
        const fechaFin = new Date(fechaFinInput.value);
        const secondContainer = document.querySelector('.second-container');

        // Limpiar el contenedor antes de agregar nuevas tablas
        secondContainer.innerHTML = '';

        // Asegurarse de que la fecha de inicio sea anterior a la de fin
        if (fechaInicio > fechaFin) {
            return; // O puedes manejar el error aquí
        }

        // Array de meses abreviados
        const mesesAbreviados = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];

        // Calcular los meses entre las fechas
        let fechaActual = new Date(fechaInicio);

        while (fechaActual <= fechaFin) {
            // Obtener el mes y el año desde la fecha actual
            const mesAbreviado = mesesAbreviados[fechaActual.getMonth()];
            const año = fechaActual.getFullYear();

            // Crear el nuevo contenido siguiendo la estructura de la tabla
            const nuevoContenido = `
                <div class="colu">
                    <span class="mes-año">${mesAbreviado}-${año}</span>

                    <div class="inputs">
                        <input type="number" class="input-projected" placeholder="$" oninput="calcularTotal(this)">
                        <input type="number" class="input-real" placeholder="$" oninput="calcularTotal(this)">
                    </div>

                    <span class="porcentaje month-percent">0%</span>
                </div>
            `;

            // Insertar el nuevo contenido en el secondContainer
            secondContainer.insertAdjacentHTML('beforeend', nuevoContenido);

            // Avanzar al siguiente mes
            fechaActual.setMonth(fechaActual.getMonth() + 1);
        }

        // Llamar a actualizarTotales para asegurarse de que los totales están al día
        actualizarTotales();
    }

    // Función para calcular y mostrar los totales
    window.calcularTotal = function(input) {
        let totalProjected = 0;
        let totalReal = 0;

        // Obtener todos los inputs de tipo "number"
        const inputsProjected = document.querySelectorAll('.input-projected');
        const inputsReal = document.querySelectorAll('.input-real');

        // Sumar los valores de los inputs proyectados
        inputsProjected.forEach(input => {
            totalProjected += parseFloat(input.value) || 0; // Convertir a número y sumar
        });

        // Sumar los valores de los inputs reales
        inputsReal.forEach(input => {
            totalReal += parseFloat(input.value) || 0; // Convertir a número y sumar
        });

        // Actualizar los valores en los spans
        document.querySelector('.total-projected-value').textContent = totalProjected.toFixed(2); // Formatear a 2 decimales
        document.querySelector('.total-real-value').textContent = totalReal.toFixed(2); // Formatear a 2 decimales

        // Calcular el porcentaje total (si deseas calcularlo)
        const totalPercent = totalProjected !== 0 ? ((totalReal / totalProjected) * 100).toFixed(2) : 0;
        document.querySelector('.total-percent-value').textContent = totalPercent + '%';
    };

    function actualizarTotales() {
        // Llama a calcularTotal para asegurarte de que los totales están al día
        calcularTotal();
    }
});

$(document).ready(function() {
    $('#guardar-btn').on('click', function(event) {
        event.preventDefault(); // Evita el envío del formulario por defecto

        // Array para almacenar los datos de facturación
        let facturacionData = [];

        // Recoger los valores de los inputs de facturación
        $('.inputs').each(function() {
            const projected = $(this).find('.input-projected').val();
            const real = $(this).find('.input-real').val();
            const month = 'nombre_del_mes'; // Define cómo obtendrás el mes correspondiente

            // Agregar los datos a la array
            facturacionData.push({
                mes: month,
                proyectada: projected,
                real: real
            });
        });

        // Enviar los datos al servidor
        $.ajax({
            url: '#project-facturacion-form'.replace(':projectId', $('#project_id').val()),
            type: 'POST',
            data: {
                facturacion: facturacionData,
                _token: '{{ csrf_token() }}'
            },
            success: function(response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'La facturación se ha guardado correctamente.',
                });
            },
            error: function(xhr) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al guardar la facturación.',
                });
            }
        });
    });
});


