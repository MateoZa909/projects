document.addEventListener('DOMContentLoaded', function() {
    const fechaInicioInput = document.getElementById('fecha_inicio'); // Input de fecha de inicio
    const fechaFinInput = document.getElementById('fecha_fin'); // Input de fecha de fin

    // Escuchar cambios en los campos de fecha
    fechaInicioInput.addEventListener('change', generarTablasTiempos);
    fechaFinInput.addEventListener('change', generarTablasTiempos);

    function generarTablasTiempos() {
        const fechaInicio = new Date(fechaInicioInput.value);
        const fechaFin = new Date(fechaFinInput.value);
        const secondContainer = document.querySelector('.second-container-tiempos');

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
            const mesAbreviado = mesesAbreviados[fechaActual.getMonth()];
            const año = fechaActual.getFullYear();

            // Crear el nuevo contenido para tiempos
            const nuevoContenido = `
                <div class="colu-tiempos">
                    <span class="mes-año-tiempos" name="tim_month" value="{{ old('bil_month') }}">${mesAbreviado}-${año}</span>

                    <div class="inputs-tiempos">
                        <input type="number" class="input-projected-tiempos" name="tim_projected" value="{{ old('bil_month') }}" placeholder="%" oninput="calcularTotalTiempos(this)">
                        <input type="number" class="input-acumulado" placeholder="%" oninput="calcularTotalTiempos(this)">
                        <input type="number" class="input-real-tiempos" name="tim_real" value="{{ old('bil_month') }}" placeholder="%" oninput="calcularTotalTiempos(this)">
                    </div>

                    <span class="porcentaje month-percent-tiempos">0%</span>
                </div>
            `;

            secondContainer.insertAdjacentHTML('beforeend', nuevoContenido);

            // Avanzar al siguiente mes
            fechaActual.setMonth(fechaActual.getMonth() + 1);
        }

        // Llamar a actualizarTotales para asegurarse de que los totales están al día
        actualizarTotalesTiempos();
    }

    // Función para calcular y mostrar los totales para tiempos
    window.calcularTotalTiempos = function(input) {
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

    function actualizarTotalesTiempos() {
        // Llama a calcularTotalTiempos para asegurarte de que los totales están al día
        calcularTotalTiempos();
    }
});
