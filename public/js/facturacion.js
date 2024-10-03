let fechaInicioInput = document.getElementById('fecha_inicio');
let fechaFinInput = document.getElementById('fecha_fin');
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

            // ** Aquí agregamos los inputs ocultos **
            meses.forEach(mes => {
                secondContainer.innerHTML += `
                <div class="factura">
                    <input type="hidden" name="valores[${mes.nombre}][mes]" value="${mes.nombre}">
                    <input type="hidden" name="valores[${mes.nombre}][proyectada]" value="${valoresMeses[mes.nombre]?.proyectada || 0}">
                    <input type="hidden" name="valores[${mes.nombre}][real]" value="${valoresMeses[mes.nombre]?.real || 0}">
                </div>
                    `;
            });

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
    }
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
    const diaInicio = fechaInicio.getDate(); // Obtener el día de inicio
    const mesFin = fechaFin.getMonth();
    const anioFin = fechaFin.getFullYear();
    const diaFin = fechaFin.getDate(); // Obtener el día de fin

    let anioActual = anioInicio;
    let mesActual = mesInicio;
    let diaActual = diaInicio; // Día actual que se usará en el formateo

    while (anioActual < anioFin || (anioActual === anioFin && mesActual <= mesFin)) {
        // Formatear la fecha como 'dd-mmm'
        const fecha = new Date(anioActual, mesActual, diaActual);
        const dia = fecha.getDate();
        const mesAbreviado = fecha.toLocaleString('es-ES', { month: 'short' }); // Obtener el mes abreviado (ej. 'oct', 'ene')
        const fechaFormateada = `${anioActual}-${mesAbreviado}`; // Formato 'mm-yyyy' usando el año correcto (anioActual)

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
    const realInputs = document.querySelectorAll('.input-real');
    const percentElements = document.querySelectorAll('.month-percent');

    let totalProjected = 0;
    let totalReal = 0;

    projectedInputs.forEach(input => {
        totalProjected += parseFloat(input.value) || 0; // Sumar solo si es un número
    });

    realInputs.forEach(input => {
        totalReal += parseFloat(input.value) || 0; // Sumar solo si es un número
    });

    // Mostrar totales en formato de moneda COP
    document.querySelector('.total-projected-value').textContent = totalProjected.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }); // Actualizar total proyectado
    document.querySelector('.total-real-value').textContent = totalReal.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }); // Actualizar total real

    // Calcular y mostrar porcentaje total
    const percent = (totalProjected > 0) ? (totalReal / totalProjected) * 100 : 0; // Calcular porcentaje total
    document.querySelector('.total-percent-value').textContent = percent > 0 ? percent.toFixed(0) + '%' : '0%'; // Actualizar porcentaje

    // Actualizar porcentajes individuales de cada mes
    percentElements.forEach((el, index) => {
        const projectedValue = parseFloat(projectedInputs[index].value) || 0;
        const realValue = parseFloat(realInputs[index].value) || 0;

        const monthPercent = (projectedValue > 0) ? (realValue / projectedValue) * 100 : 0; // Calcular porcentaje mensual
        el.textContent = monthPercent > 0 ? monthPercent.toFixed(0) + '%' : '0%'; // Actualizar porcentaje mensual
    });
}

// Función para limpiar los campos del formulario
function limpiarFormulario() {
    // Si tienes los inputs dentro de un form, puedes usar reset:
    document.getElementById('form-proyecto').reset();
    document.getElementById('form-facturacion').reset();

    // O si no están dentro de un <form>, puedes limpiar los inputs manualmente
    document.getElementById('nombre-proyecto').value = '';
    document.getElementById('empresa').value = '';
    document.getElementById('encargado').value = '';
    document.getElementById('asignacion').value = '';
    document.getElementById('estado').value = '';
    document.getElementById('supervisor').value = '';
    document.getElementById('fecha_inicio').value = '';
    document.getElementById('fecha_fin').value = '';

    // Limpiar las facturas generadas dinámicamente
    secondContainer.innerHTML = '<p class="mensaje-inicial">Seleccione un rango de fechas para desplegar los meses.</p>';
    thirdContainer.innerHTML = ''; // Limpiar el contenedor de totales
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




