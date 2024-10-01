const fechaInicioInput = document.getElementById('fecha_inicio');
const fechaFinInput = document.getElementById('fecha_fin');
const secondContainer = document.querySelector('.second-container');
const thirdContainer = document.querySelector('.third-container');

const valoresMeses = {}; // Objeto para almacenar los valores de los meses

// Escuchar los cambios en los inputs de fecha
fechaInicioInput.addEventListener('change', generarContenedoresMeses);
fechaFinInput.addEventListener('change', generarContenedoresMeses);

function generarContenedoresMeses() {
    const fechaInicio = new Date(fechaInicioInput.value);
    const fechaFin = new Date(fechaFinInput.value);

    // Verificar si ambas fechas son válidas
    if (fechaInicio && fechaFin && fechaInicio <= fechaFin) {
        // Limpiar el contenido anterior
        secondContainer.innerHTML = '';
        thirdContainer.innerHTML = '';

        // Guardar valores actuales en el objeto antes de sobrescribir
        guardarValoresActuales();

        const meses = obtenerMesesEnRango(fechaInicio, fechaFin);
        if (meses.length > 0) {
            // Generar el HTML dinámicamente para los meses, inputs proyectados, reales y los porcentajes
            let secondContainerHtml = `
                <div class="content-title-month">
                    ${meses.map(mes => `<span data-year="${mes.anio}">${mes.nombre}</span>`).join('')}
                </div>
                <div class="content-inputs">
                    <div class="content projected">
                        ${meses.map(mes => `
                            <input type="number" class="input-projected" placeholder="$0" value="${valoresMeses[mes.nombre]?.proyectada || ''}">
                        `).join('')}
                    </div>
                    <div class="content real">
                        ${meses.map(mes => `
                            <input type="number" class="input-real" placeholder="$0" value="${valoresMeses[mes.nombre]?.real || ''}">
                        `).join('')}
                    </div>
                </div>
                <div class="percent">
                    ${meses.map(mes => `<span class="month-percent" data-month="${mes.nombre}">%</span>`).join('')}
                </div>
            `;

            // Agregar contenido a secondContainer
            secondContainer.innerHTML = secondContainerHtml;

            // Generar el HTML para el total en thirdContainer
            let thirdContainerHtml = `
                <div class="back-total">Total</div>
                <div class="total-inputs">
                    <div class="total-projected">
                        <span class="total-projected-value">0</span> <!-- Total proyectado -->
                    </div>
                    <div class="total-real">
                        <span class="total-real-value">0</span> <!-- Total real -->
                    </div>
                </div>
                <div class="total-percent">
                    <span class="total-percent-value">0</span> % <!-- Porcentaje -->
                </div>
            `;

            // Agregar contenido a thirdContainer
            thirdContainer.innerHTML = thirdContainerHtml;

            // Agregar evento para calcular totales
            secondContainer.addEventListener('input', calcularTotales);
            calcularTotales(); // Calcular totales iniciales
        }
    } else {
        // Si las fechas no son válidas, mostrar mensaje inicial
        secondContainer.innerHTML = '<p class="mensaje-inicial">Seleccione un rango de fechas para desplegar los meses.</p>';
        thirdContainer.innerHTML = '<p class="mensaje-inicial">Seleccione un rango de fechas para desplegar los totales.</p>';
    }
}

function mostrarEsqueleto() {
    // Aquí puedes definir el esqueleto por defecto que deseas mostrar
    secondContainer.innerHTML = `
        <div class="content-title-month">
            <span>No hay meses seleccionados</span>
        </div>
        <div class="content-inputs">
            <div class="content projected">
                <input type="number" class="input-projected" placeholder="$0" disabled>
            </div>
            <div class="content real">
                <input type="number" class="input-real" placeholder="$0" disabled>
            </div>
        </div>
        <div class="percent">
            <span class="month-percent" data-month="default">%</span>
        </div>
    `;

    thirdContainer.innerHTML = `
        <div class="back-total">Total</div>
        <div class="total-inputs">
            <div class="total-projected">
                <span class="total-projected-value">0</span> <!-- Total proyectado -->
            </div>
            <div class="total-real">
                <span class="total-real-value">0</span> <!-- Total real -->
            </div>
        </div>
        <div class="total-percent">
            <span class="total-percent-value">0</span> % <!-- Porcentaje -->
        </div>
    `;
}

function guardarValoresActuales() {
    // Obtener todos los inputs proyectados y reales
    const projectedInputs = secondContainer.querySelectorAll('.input-projected');
    const realInputs = secondContainer.querySelectorAll('.input-real');

    projectedInputs.forEach((input, index) => {
        const mesNombre = secondContainer.querySelectorAll('.content-title-month span')[index].textContent;
        valoresMeses[mesNombre] = valoresMeses[mesNombre] || {};
        valoresMeses[mesNombre].proyectada = input.value; // Guardar el valor proyectado
    });

    realInputs.forEach((input, index) => {
        const mesNombre = secondContainer.querySelectorAll('.content-title-month span')[index].textContent;
        valoresMeses[mesNombre] = valoresMeses[mesNombre] || {};
        valoresMeses[mesNombre].real = input.value; // Guardar el valor real
    });
}

function obtenerMesesEnRango(fechaInicio, fechaFin) {
    const meses = [];
    const mesInicio = fechaInicio.getMonth();
    const anioInicio = fechaInicio.getFullYear();
    const mesFin = fechaFin.getMonth();
    const anioFin = fechaFin.getFullYear();

    let anioActual = anioInicio;
    let mesActual = mesInicio;

    while (anioActual < anioFin || (anioActual === anioFin && mesActual <= mesFin)) {
        const mesNombre = new Date(anioActual, mesActual).toLocaleString('es-ES', { month: 'long' });
        const mesFormateado = {
            nombre: `${mesNombre.charAt(0).toUpperCase()}${mesNombre.slice(1)}`, // Mes con mayúscula
            anio: anioActual // Año correspondiente
        };
        meses.push(mesFormateado);

        mesActual++;
        if (mesActual > 11) {  // Saltar al siguiente año
            mesActual = 0;
            anioActual++;
        }
    }

    return meses;
}

// Función para calcular totales
function calcularTotales() {
    const projectedInputs = document.querySelectorAll('.input-projected');
    const realInputs = document.querySelectorAll('.input-real');
    const percentElements = document.querySelectorAll('.month-percent');

    let totalProjected = 0;
    let totalReal = 0;

    projectedInputs.forEach(input => {
        totalProjected += parseFloat(input.value) || 0; // Sumar solo si el valor es un número
    });

    realInputs.forEach(input => {
        totalReal += parseFloat(input.value) || 0; // Sumar solo si el valor es un número
    });

    // Actualizar los campos de total
    const totalProjectedValue = document.querySelector('.total-projected-value');
    const totalRealValue = document.querySelector('.total-real-value');

    totalProjectedValue.textContent = totalProjected; // Actualizar texto en el span
    totalRealValue.textContent = totalReal; // Actualizar texto en el span

    // Calcular y mostrar el porcentaje de cumplimiento total
    const totalPercentValue = document.querySelector('.total-percent-value');
    const percent = totalProjected > 0 ? (totalReal / totalProjected) * 100 : 0; // Evitar división por cero
    totalPercentValue.textContent = percent.toFixed(2); // Dos decimales

    // Calcular y mostrar el porcentaje para cada mes
    percentElements.forEach((percentElement, index) => {
        const projectedValue = parseFloat(projectedInputs[index].value) || 0;
        const realValue = parseFloat(realInputs[index].value) || 0;
        const monthPercent = projectedValue > 0 ? (realValue / projectedValue) * 100 : 0;
        percentElement.textContent = monthPercent.toFixed(2) + '%'; // Mostrar el porcentaje de ese mes
    });
}
