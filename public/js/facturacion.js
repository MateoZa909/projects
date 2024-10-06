// facturacion.js

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

    function calcularTotal(input) {
        const inputProyectado = input.closest('.content-inputs').querySelector('.input-projected');
        const inputReal = input.closest('.content-inputs').querySelector('.input-real');
        const spanPercent = input.closest('.content-inputs').nextElementSibling.querySelector('.month-percent');

        const proyectado = parseFloat(inputProyectado.value) || 0; // Valor proyectado
        const real = parseFloat(inputReal.value) || 0; // Valor real

        // Calcular el porcentaje
        const porcentajeCumplimiento = proyectado > 0 ? (real / proyectado) * 100 : 0;

        // Actualizar el texto del porcentaje
        spanPercent.textContent = porcentajeCumplimiento.toFixed(2) + '%';

        // Actualizar totales (si es necesario)
        actualizarTotales();
    }

    function actualizarTotales() {
        let totalProyectado = 0;
        let totalReal = 0;

        // Obtener todos los inputs de proyectados y reales
        const inputsProyectados = document.querySelectorAll('.input-projected');
        const inputsReales = document.querySelectorAll('.input-real');

        inputsProyectados.forEach(input => {
            totalProyectado += parseFloat(input.value) || 0; // Sumar valores, considerando NaN como 0
        });

        inputsReales.forEach(input => {
            totalReal += parseFloat(input.value) || 0; // Sumar valores, considerando NaN como 0
        });

        // Actualizar los valores totales en la interfaz
        document.querySelector('.total-projected-value').textContent = totalProyectado;
        document.querySelector('.total-real-value').textContent = totalReal;

        // Calcular y actualizar el porcentaje de cumplimiento
        const totalCumplimiento = totalProyectado > 0 ? (totalReal / totalProyectado) * 100 : 0;
        document.querySelector('.total-percent-value').textContent = totalCumplimiento.toFixed(2) + '%';
    }
});
