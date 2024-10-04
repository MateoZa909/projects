let fechaInicioInputTiempos = document.getElementById('fecha_inicio');
let fechaFinInputTiempos = document.getElementById('fecha_fin');
const secondContainerTiempos = document.querySelector('.second-container-tiempos');
const thirdContainerTiempos = document.querySelector('.third-container-tiempos');

const valoresMesesTiempos = {}; // Objeto para almacenar los valores de los meses

// Escuchar los cambios en los inputs de fecha
fechaInicioInputTiempos.addEventListener('change', generarContenedoresMeses);
fechaFinInputTiempos.addEventListener('change', generarContenedoresMeses);

function generarContenedoresMeses() {
    const fechaInicioT = new Date(fechaInicioInputTiempos.value);
    const fechaFinT = new Date(fechaFinInputTiempos.value);

    // Verificar si ambas fechas son válidas
    if (fechaInicioT && fechaFinT && fechaInicioT <= fechaFinT) {
        // Limpiar el contenido anterior
        secondContainerTiempos.innerHTML = '';
        thirdContainerTiempos.innerHTML = '';

        // Guardar valores actuales en el objeto antes de sobrescribir
        guardarValoresActuales();

        const meses = obtenerMesesEnRango(fechaInicioT, fechaFinT);
        if (meses.length > 0) {
            // Generar el HTML dinámicamente para los meses, inputs proyectados, reales y los porcentajes
            let secondContainerTiemposHtml = `
                <div class="content-title-month-tiempos">
                    ${meses.map(mes => `<span data-year="${mes.anio}">${mes.nombre}</span>`).join('')}
                </div>
                <div class="content-inputs-tiempos">
                    <div class="content projected">
                        ${meses.map(mes => `
                            <input type="number" class="input-projected-tiempos" placeholder="$0" value="${valoresMesesTiempos[mes.nombre]?.proyectada || ''}">
                        `).join('')}
                    </div>
                    <div class="content real">
                        ${meses.map(mes => `
                            <input type="number" class="input-real-tiempos" placeholder="$0" value="${valoresMesesTiempos[mes.nombre]?.real || ''}">
                        `).join('')}
                    </div>
                </div>
                <div class="percent">
                    ${meses.map(mes => `<span class="month-percent-tiempos" data-month="${mes.nombre}">%</span>`).join('')}
                </div>
            `;

            // Agregar contenido a secondContainerTiempos
            secondContainerTiempos.innerHTML = secondContainerTiemposHtml;

            // ** Aquí agregamos los inputs ocultos **
            meses.forEach(mes => {
                secondContainerTiempos.innerHTML += `
                <div class="tiempos">
                    <input type="hidden" name="valores[${mes.nombre}][mes]" value="${mes.nombre}">
                    <input type="hidden" name="valores[${mes.nombre}][proyectada]" value="${valoresMesesTiempos[mes.nombre]?.proyectada || 0}">
                    <input type="hidden" name="valores[${mes.nombre}][real]" value="${valoresMesesTiempos[mes.nombre]?.real || 0}">
                </div>
                    `;
            });

            // Generar el HTML para el total en thirdContainerTiempos
            let thirdContainerTiemposHtml = `
                <div class="back-total-tiempos">Total</div>
                <div class="total-inputs-tiempos">
                    <div class="total-projected-tiempos">
                        <span class="total-projected-value-tiempos">0</span> <!-- Total proyectado -->
                    </div>
                    <div class="total-real-tiempos">
                        <span class="total-real-value-tiempos">0</span> <!-- Total real -->
                    </div>
                </div>
                <div class="total-percent-tiempos">
                    <span class="total-percent-value-tiempos">0</span> % <!-- Porcentaje -->
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
    // Obtener todos los inputs proyectados y reales
    const projectedInputs = secondContainerTiempos.querySelectorAll('.input-projected-tiempos');
    const realInputs = secondContainerTiempos.querySelectorAll('.input-real-tiempos');

    projectedInputs.forEach((input, index) => {
        const mesNombre = secondContainerTiempos.querySelectorAll('.content-title-month-tiempos span')[index].textContent;
        valoresMesesTiempos[mesNombre] = valoresMesesTiempos[mesNombre] || {};
        valoresMesesTiempos[mesNombre].proyectada = input.value; // Guardar el valor proyectado
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
    const projectedInputs = document.querySelectorAll('.input-projected-tiempos');
    const realInputs = document.querySelectorAll('.input-real-tiempos');
    const percentElements = document.querySelectorAll('.month-percent-tiempos');

    let totalProjected = 0;
    let totalReal = 0;

    projectedInputs.forEach(input => {
        totalProjected += parseFloat(input.value) || 0; // Sumar solo si es un número
    });

    realInputs.forEach(input => {
        totalReal += parseFloat(input.value) || 0; // Sumar solo si es un número
    });

    // Mostrar totales en formato de moneda COP
    document.querySelector('.total-projected-value-tiempos').textContent = totalProjected.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }); // Actualizar total proyectado
    document.querySelector('.total-real-value-tiempos').textContent = totalReal.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }); // Actualizar total real

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

// ENVIO AL BACKEND
document.getElementById('guardar-btn').addEventListener('click', function(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    // Obtener el token CSRF
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    // Obtener datos del primer formulario (Proyecto)
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

    // Obtener datos del tercer formulario (Tiempos)
    let tiemposData = Array.from(secondContainerTiempos.querySelectorAll('.tiempos')).map((tiempo, index) => {
        const mes = secondContainerTiempos.querySelectorAll('.content-title-month-tiempos span')[index].textContent; // Mes del título
        const proyectada = tiempo.querySelector('.input-projected-tiempos').value; // Tiempo proyectado
        const real = tiempo.querySelector('.input-real-tiempos').value; // Tiempo real

        return {
            mes, // Mes de tiempo
            proyectada: proyectada || '', // Tiempo proyectado
            real: real || '' // Tiempo real
        };
    });

    // Enviar datos al servidor
    fetch('/proyectos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken
        },
        body: JSON.stringify({
            ...proyectoData,
            facturacion: facturacionData,
            tiempos: tiemposData
        })
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => {
                throw err; // Lanza el error para capturarlo más adelante
            });
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
            limpiarFormulario(); // Limpia los campos
        });
    })
    .catch(error => {
        if (error.errors) {
            let errorMessages = Object.values(error.errors).flat().join('\n'); // Une los mensajes de error
            Swal.fire({
                title: 'Errores',
                text: errorMessages,
                icon: 'error',
                confirmButtonText: 'Cerrar'
            });
        } else {
            console.error('Error al enviar los datos:', error);
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al crear el proyecto.',
                icon: 'error',
                confirmButtonText: 'Cerrar'
            });
        }
    });

});





