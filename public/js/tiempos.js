let fechaInicioTiempos = document.getElementById('fecha_inicio');
let fechaFinTiempos = document.getElementById('fecha_fin');
const secondContainerTiempos = document.querySelector('.second-container-tiempos');
const thirdContainerTiempos = document.querySelector('.third-container-tiempos');

const valoresMesesTiempos = {}; // Objeto para almacenar los valores de los meses

// Escuchar los cambios en los inputs de fecha
fechaInicioTiempos.addEventListener('change', generarContenedoresMeses);
fechaFinTiempos.addEventListener('change', generarContenedoresMeses);

function generarContenedoresMeses() {
    const fechaInicio = new Date(fechaInicioTiempos.value);
    const fechaFin = new Date(fechaFinTiempos.value);

    // Verificar si ambas fechas son válidas
    if (fechaInicio && fechaFin && fechaInicio <= fechaFin) {
        // Limpiar el contenido anterior
        secondContainerTiempos.innerHTML = '';
        thirdContainerTiempos.innerHTML = '';

        // Guardar valores actuales en el objeto antes de sobrescribir
        guardarValoresActuales();

        const meses = obtenerMesesEnRango(fechaInicio, fechaFin);
        if (meses.length > 0) {
            // Generar el HTML dinámicamente para los meses, inputs proyectados, acumulados y reales
            let secondContainerTiemposHtml = `
                <div class="content-title-month-tiempos">
                    ${meses.map(mes => `<span data-year="${mes.anio}">${mes.nombre}</span>`).join('')}
                </div>
                <div class="content-inputs-tiempos">
                    <div class="content projected-tiempos">
                        ${meses.map(mes =>
                            `<input type="number" class="input-projected" placeholder="0%" min="0" max="100" value="${valoresMesesTiempos[mes.nombre]?.proyectada || ''}">`
                        ).join('')}
                    </div>
                    <div class="content accumulated-tiempos">
                        ${meses.map(mes =>
                            `<input type="number" class="input-accumulated" placeholder="0%" min="0" max="100" value="${valoresMesesTiempos[mes.nombre]?.acumulado || ''}">`
                        ).join('')}
                    </div>
                    <div class="content real-tiempos">
                        ${meses.map(mes =>
                            `<input type="number" class="input-real-tiempos" placeholder="0%" min="0" max="100" value="${valoresMesesTiempos[mes.nombre]?.real || ''}">`
                        ).join('')}
                    </div>
                </div>
                <div class="percent-tiempos">
                    ${meses.map(mes => `<span class="month-percent" data-month="${mes.nombre}">%</span>`).join('')}
                </div>
            `;

            // Agregar contenido a secondContainerTiempos
            secondContainerTiempos.innerHTML = secondContainerTiemposHtml;

            // ** Aquí agregamos los inputs ocultos **
            meses.forEach(mes => {
                secondContainerTiempos.innerHTML += `
                    <div class="factura">
                        <input type="hidden" name="valores[${mes.nombre}][mes]" value="${mes.nombre}">
                        <input type="hidden" name="valores[${mes.nombre}][proyectada]" value="${valoresMesesTiempos[mes.nombre]?.proyectada || 0}">
                        <input type="hidden" name="valores[${mes.nombre}][acumulado]" value="${valoresMesesTiempos[mes.nombre]?.acumulado || 0}">
                        <input type="hidden" name="valores[${mes.nombre}][real]" value="${valoresMesesTiempos[mes.nombre]?.real || 0}">
                    </div>
                `;
            });

            // Generar el HTML para el total en thirdContainerTiempos
            let thirdContainerTiemposHtml = `
                <div class="back-total">Total</div>
                <div class="total-inputs-tiempos">
                    <div class="total-projected-tiempos">
                        <span class="total-projected-value-tiempos">0</span>
                    </div>
                    <div class="total-acumulado-tiempos">
                        <span class="total-acumulado-value-tiempos">0</span>
                    </div>
                    <div class="total-real-tiempos">
                        <span class="total-real-value-tiempos">0</span>
                    </div>
                </div>
                <div class="total-percent-tiempos">
                    <span class="total-percent-value-tiempos">0</span>
                </div>
            `;

            // Agregar contenido a thirdContainerTiempos
            thirdContainerTiempos.innerHTML = thirdContainerTiemposHtml;

            // Agregar evento para calcular totales
            secondContainerTiempos.addEventListener('input', calcularTotales);
            calcularTotales(); // Calcular totales iniciales
        }
    } else {
        // Si las fechas no son válidas, mostrar mensaje inicial
        secondContainerTiempos.innerHTML = '<p class="mensaje-inicial">Seleccione un rango de fechas para desplegar los meses.</p>';
    }
}

function guardarValoresActuales() {
    // Obtener todos los inputs proyectados, acumulados y reales
    const projectedInputs = secondContainerTiempos.querySelectorAll('.input-projected');
    const accumulatedInputs = secondContainerTiempos.querySelectorAll('.input-accumulated');
    const realInputs = secondContainerTiempos.querySelectorAll('.input-real-tiempos');

    projectedInputs.forEach((input, index) => {
        const mesNombre = secondContainerTiempos.querySelectorAll('.content-title-month-tiempos span')[index].textContent;
        valoresMesesTiempos[mesNombre] = valoresMesesTiempos[mesNombre] || {};
        valoresMesesTiempos[mesNombre].proyectada = input.value; // Guardar el valor proyectado
    });

    accumulatedInputs.forEach((input, index) => {
        const mesNombre = secondContainerTiempos.querySelectorAll('.content-title-month-tiempos span')[index].textContent;
        valoresMesesTiempos[mesNombre] = valoresMesesTiempos[mesNombre] || {};
        valoresMesesTiempos[mesNombre].acumulado = input.value; // Guardar el valor acumulado
    });

    realInputs.forEach((input, index) => {
        const mesNombre = secondContainerTiempos.querySelectorAll('.content-title-month-tiempos span')[index].textContent;
        valoresMesesTiempos[mesNombre] = valoresMesesTiempos[mesNombre] || {};
        valoresMesesTiempos[mesNombre].real = input.value; // Guardar el valor real
    });
}

function obtenerMesesEnRango(fechaInicio, fechaFin) {
    const meses = [];
    const mesInicio = fechaInicio.getMonth();
    const anioInicio = fechaInicio.getFullYear();
    const diaInicio = fechaInicio.getDate(); // Obtener el día de inicio
    const mesFin = fechaFin.getMonth();
    const anioFin = fechaFin.getFullYear();
    const diaFin = fechaFin.getDate(); // Obtener el día de fin

    let anioActual = anioInicio;
    let mesActual = mesInicio;
    let diaActual = diaInicio; // Día actual que se usará en el formateo

    while (anioActual < anioFin || (anioActual === anioFin && mesActual <= mesFin)) {
        // Formatear la fecha como 'mm-yyyy'
        const fecha = new Date(anioActual, mesActual, diaActual);
        const mesAbreviado = fecha.toLocaleString('es-ES', { month: 'short' }); // Obtener el mes abreviado (ej. 'oct', 'ene')
        const fechaFormateada = `${anioActual}-${mesAbreviado}`; // Formato 'yyyy-mmm'

        const mesFormateado = {
            nombre: fechaFormateada, // Usamos la fecha formateada
            anio: anioActual // Año correspondiente
        };
        meses.push(mesFormateado);

        // Saltar al siguiente mes
        mesActual++;
        if (mesActual > 11) {  // Saltar al siguiente año
            mesActual = 0;
            anioActual++;
        }

        // Usar el día de fin si es el último mes
        if (anioActual === anioFin && mesActual === mesFin) {
            diaActual = diaFin;
        }
    }

    return meses;
}

// Función para calcular totales
function calcularTotales() {
    const projectedInputs = document.querySelectorAll('.input-projected');
    const accumulatedInputs = document.querySelectorAll('.input-accumulated');
    const realInputs = document.querySelectorAll('.input-real-tiempos');
    const percentElements = document.querySelectorAll('.month-percent');

    let totalProjected = 0;
    let totalAccumulated = 0;
    let totalReal = 0;

    // Sumar los valores proyectados
    projectedInputs.forEach(input => {
        totalProjected += parseFloat(input.value) || 0; // Sumar valores, ignorando NaN
    });

    // Sumar los valores acumulados
    accumulatedInputs.forEach(input => {
        totalAccumulated += parseFloat(input.value) || 0;
    });

    // Sumar los valores reales
    realInputs.forEach(input => {
        totalReal += parseFloat(input.value) || 0;
    });

    // Mostrar totales en el HTML
    document.querySelector('.total-projected-value-tiempos').textContent = totalProjected.toFixed(0); // Mostrar sin decimales
    document.querySelector('.total-acumulado-value-tiempos').textContent = totalAccumulated.toFixed(0);
    document.querySelector('.total-real-value-tiempos').textContent = totalReal.toFixed(0);

    // Calcular porcentaje total si totalReal no es cero
    const totalPercent = totalProjected > 0 ? ((totalReal / totalProjected) * 100).toFixed(2) : 0;
    document.querySelector('.total-percent-value-tiempos').textContent = totalPercent + '%';
}

// ENVIO AL BACKEND
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
    let facturacionData = Array.from(secondContainerTiempos.querySelectorAll('.factura')).map((factura, index) => {
        const mes = secondContainerTiempos.querySelectorAll('.content-title-month span')[index].textContent; // Mes del título
        const proyectada = secondContainerTiempos.querySelectorAll('.input-projected')[index].value; // Facturación proyectada
        const real = secondContainerTiempos.querySelectorAll('.input-real')[index].value; // Facturación real

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




