document.addEventListener('DOMContentLoaded', function() {
    const fechaInicioInput = document.getElementById('fecha_inicio');
    const fechaFinInput = document.getElementById('fecha_fin');

    // Escuchar cambios en los campos de fecha
    fechaInicioInput.addEventListener('change', generarTablasFacturacion);
    fechaFinInput.addEventListener('change', generarTablasFacturacion);

    function generarTablasFacturacion() {
        const fechaInicio = new Date(fechaInicioInput.value);
        const fechaFin = new Date(fechaFinInput.value);
        const secondContainer = document.querySelector('.second-container');

        // Limpiar el contenedor antes de agregar nuevas tablas
        secondContainer.innerHTML = '';

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
            const mesAbreviado = mesesAbreviados[fechaActual.getMonth()];
            const año = fechaActual.getFullYear();

            // Crear el nuevo contenido siguiendo la estructura de la tabla
            const nuevoContenido = `
                <div class="colu">
                    <span class="mes-año">${mesAbreviado}-${año}</span>
                    <div class="inputs">
                        <input type="hidden" name="facturacion[${index}][bil_month]" value="${mesAbreviado}-${año}">
                        <input type="number" name="facturacion[${index}][bil_projected]" class="input-projected" placeholder="$" oninput="calcularTotal()">
                        <input type="number" name="facturacion[${index}][bil_real]" class="input-real" placeholder="$" oninput="calcularTotal()">
                    </div>
                    <span class="porcentaje month-percent">0%</span>
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
    window.calcularTotal = function() {
        let totalProjected = 0;
        let totalReal = 0;

        // Obtener todos los inputs de tipo "number"
        const inputsProjected = document.querySelectorAll('.input-projected');
        const inputsReal = document.querySelectorAll('.input-real');
        const monthPercentElements = document.querySelectorAll('.month-percent'); // Obtener todos los spans de porcentaje mensual

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
        const spanProjected = document.querySelector('.span-projected');
        const spanReal = document.querySelector('.span-real');
        const spanPercent = document.querySelector('.span-percent');

        // Verificar si los spans existen antes de asignar valores
        if (spanProjected) spanProjected.textContent = formatCurrency(totalProjected); // Formatear a pesos colombianos
        if (spanReal) spanReal.textContent = formatCurrency(totalReal); // Formatear a pesos colombianos

        // Calcular el porcentaje total (general)
        const totalPercent = totalProjected !== 0 ? ((totalReal / totalProjected) * 100).toFixed(2) : 0;
        if (spanPercent) spanPercent.textContent = totalPercent + '%';
    };

    function formatCurrency(value) {
        return value.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
    }

    function actualizarTotales() {
        // Llama a calcularTotal para asegurarte de que los totales están al día
        calcularTotal();
    }
});
