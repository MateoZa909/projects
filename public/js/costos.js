document.addEventListener('DOMContentLoaded', function() {
    const fechaInicioInput = document.getElementById('fecha_inicio');
    const fechaFinInput = document.getElementById('fecha_fin');

    // Escuchar cambios en los campos de fecha
    fechaInicioInput.addEventListener('change', generarTablasCostos);
    fechaFinInput.addEventListener('change', generarTablasCostos);

    function generarTablasCostos() {
        const fechaInicio = new Date(fechaInicioInput.value);
        const fechaFin = new Date(fechaFinInput.value);
        const secondContainer = document.querySelector('.second-container-costos');

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
                <div class="colu-costos">
                    <span class="mes-año-costos" name="cost_month" value="{{ old('cos_month') }}">${mesAbreviado}-${año}</span>

                    <div class="inputs-costos">
                        <input type="number" class="input-projected-costos" name="cost_projected" value="{{ old('cos_projected') }}" placeholder="$" oninput="calcularTotal(this)">
                        <input type="number" class="input-real-costos" name="cost_real" value="{{ old('cos_real') }}" placeholder="$" oninput="calcularTotal(this)">
                    </div>

                    <span class="porcentaje month-percent-costos">0%</span>
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
        const inputsProjected = document.querySelectorAll('.input-projected-costos');
        const inputsReal = document.querySelectorAll('.input-real-costos');
        const monthPercentElements = document.querySelectorAll('.month-percent-costos'); // Obtener todos los spans de porcentaje mensual

        // Sumar los valores de los inputs proyectados y reales, y calcular porcentaje por mes
        inputsProjected.forEach((inputProjected, index) => {
            const projectedValue = parseFloat(inputProjected.value) || 0;
            const realValue = parseFloat(inputsReal[index].value) || 0;

            // Actualizar los totales proyectados y reales
            totalProjected += projectedValue;
            totalReal += realValue;

            // Calcular el porcentaje para cada mes
            const monthPercent = projectedValue !== 0 ? ((realValue / projectedValue) * 100).toFixed(0) : 0;
            monthPercentElements[index].textContent = monthPercent + '%'; // Actualizar el span de porcentaje mensual
        });

        // Actualizar los valores en los spans de totales generales
        document.querySelector('.total-projected-value-costos').textContent = formatCurrency(totalProjected); // Formatear a pesos colombianos
        document.querySelector('.total-real-value-costos').textContent = formatCurrency(totalReal); // Formatear a pesos colombianos

        // Calcular el porcentaje total (general)
        const totalPercent = totalProjected !== 0 ? ((totalReal / totalProjected) * 100).toFixed(0) : 0;
        document.querySelector('.total-percent-value-costos').textContent = totalPercent + '%';
    };

    function formatCurrency(value) {
        return value.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
    }

    function actualizarTotales() {
        // Llama a calcularTotal para asegurarte de que los totales están al día
        calcularTotal();
    }
});




