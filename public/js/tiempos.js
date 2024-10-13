document.addEventListener('DOMContentLoaded', function() {
    const fechaInicioInput = document.getElementById('fecha_inicio');
    const fechaFinInput = document.getElementById('fecha_fin');

    let readOnlyProyectada = false;
    let readOnlyReal = false;

    if(vistaActual == 'projects.index') {
        readOnlyReal = true;
    }

    // Escuchar cambios en los campos de fecha
    fechaInicioInput.addEventListener('change', generarTablasFacturacion);
    fechaFinInput.addEventListener('change', generarTablasFacturacion);

    function generarTablasFacturacion() {
        const fechaInicio = new Date(fechaInicioInput.value);
        const fechaFin = new Date(fechaFinInput.value);
        const secondContainer = document.getElementById('times');

        // Limpiar el contenedor antes de agregar nuevas tablas
        secondContainer.innerHTML = '';

        // Verificar si ambas fechas están seleccionadas
        if (!fechaInicioInput.value || !fechaFinInput.value) {
            const mensajeError = document.querySelector('#mensaje-error')
            // Mostrar el mensaje de error
            mensajeError.style.display = 'block';
            return; // Detener la ejecución si no se han seleccionado las fechas
        }

        // Asegurarse de que la fecha de inicio sea anterior a la de fin
        if (fechaInicio > fechaFin) {
            alert("La fecha de inicio no puede ser mayor que la fecha de fin.");
            return; // O puedes manejar el error aquí
        }

        // Array de meses abreviados
        const mesesAbreviados = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];

        // Inicializar el índice para los inputs
        let index = 0; // Para manejar los índices de facturación

        // Calcular los meses entre las fechas
        let fechaActual = new Date(fechaInicio);

        while (fechaActual <= fechaFin) {
            // Obtener el mes y el año desde la fecha actual
            const mes = fechaActual.getMonth() + 1; // Obtener el mes (1-12)
            const año = fechaActual.getFullYear();

            // Calcular BIL_YYYYMM como un número (YYYYMM)
            const bil_yyyymm = año * 100 + (fechaActual.getMonth() + 1); // Agregar 1 porque getMonth() es cero basado (0-11)
            const mesAbreviado = mesesAbreviados[mes - 1];

            const nuevoContenido = `
                <div class="colu-tiempos">
                    <span class="mes-año-tiempos">${mesAbreviado}-${año}</span>

                    <div class="inputs-tiempos">
                        <input type="hidden" name="tiempos[${index}][tim_month]" value="${mesAbreviado}-${año}"> <!-- Guardar en el formato MMM-YYYY -->
                        <input type="hidden" name="tiempos[${index}][tim_yyyymm]" value="${bil_yyyymm}"> <!-- Guardar en el formato YYYYMM -->
                        <input type="number" name="tiempos[${index}][tim_projected]" class="input-projected-tiempos" placeholder="%" oninput="calcularTotalTiempos()" ${readOnlyProyectada ? 'readonly' : ''}>
                        <input type="number" class="input-acumulado" placeholder="%" oninput="calcularTotalTiempos()" readonly>
                        <input type="number" name="tiempos[${index}][tim_real]" class="input-real-tiempos" placeholder="%" oninput="calcularTotalTiempos()" ${readOnlyReal ? 'readonly' : ''}>
                    </div>
                    <span class="porcentaje month-percent-tiempos">0%</span>
                </div>
            `;

            // Insertar el nuevo contenido en el secondContainer
            secondContainer.insertAdjacentHTML('beforeend', nuevoContenido);

            // Avanzar al siguiente mes
            fechaActual.setMonth(fechaActual.getMonth() + 1);
            index++; // Asegurarse de que el índice avanza correctamente
        }

        // Llamar a actualizarTotales para asegurarse de que los totales están al día
        actualizarTotales();
    }

    // Función para calcular y mostrar los totales
    window.calcularTotalTiempos = function() {
        let totalProjected = 0;
        let totalAccumulated = 0;
        let totalReal = 0;

        const inputsProjected = document.querySelectorAll('.input-projected-tiempos');
        const inputsAccumulated = document.querySelectorAll('.input-acumulado');
        const inputsReal = document.querySelectorAll('.input-real-tiempos');
        const monthPercentElements = document.querySelectorAll('.month-percent-tiempos');

        // Sumar los valores y calcular porcentaje por mes
        inputsProjected.forEach((inputProjected, index) => {
            const projectedValue = parseFloat(inputProjected.value) || 0;
            const accumulatedValue = parseFloat(inputsAccumulated[index].value) || 0;
            const realValue = parseFloat(inputsReal[index].value) || 0;

            totalProjected += projectedValue;
            totalAccumulated += accumulatedValue;
            totalReal += realValue;

            const monthPercent = projectedValue !== 0 ? ((realValue / projectedValue) * 100).toFixed(2) : 0;
            monthPercentElements[index].textContent = monthPercent + '%';
        });

         // Actualizar los valores en los spans de totales generales
         document.querySelector('.total-projected-value-tiempos').textContent = totalProjected.toFixed(0) + '%';
         document.querySelector('.total-accumulated-value-tiempos').textContent = totalAccumulated.toFixed(0) + '%'; // Actualizar acumulado
         document.querySelector('.total-real-value-tiempos').textContent = totalReal.toFixed(0) + '%';

        // Calcular el porcentaje total (general)
        const totalPercent = totalProjected !== 0 ? ((totalReal / totalProjected) * 100).toFixed(2) : 0;
        document.querySelector('.total-percent-value-tiempos').textContent = totalPercent + '%';
    };

    function formatCurrency(value) {
        return value.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
    }

    function actualizarTotales() {
        // Llama a calcularTotal para asegurarte de que los totales están al día
        calcularTotal();
    }
});
