// Selecciona elementos de los formularios de facturación y tiempos
let fechaInicioInput = document.getElementById('fecha_inicio');
let fechaFinInput = document.getElementById('fecha_fin');
const secondContainerFacturacion = document.querySelector('.second-container');
const thirdContainerFacturacion = document.querySelector('.third-container');
const secondContainerTiempos = document.querySelector('.second-container-tiempos');
const thirdContainerTiempos = document.querySelector('.third-container-tiempos');

const valoresMesesFacturacion = {};
const valoresMesesTiempos = {};

// Escuchar los cambios en los inputs de fecha
fechaInicioInput.addEventListener('change', () => {
    generarContenedoresMeses(secondContainerFacturacion, 'facturacion');
    generarContenedoresMeses(secondContainerTiempos, 'tiempos');
});

fechaFinInput.addEventListener('change', () => {
    generarContenedoresMeses(secondContainerFacturacion, 'facturacion');
    generarContenedoresMeses(secondContainerTiempos, 'tiempos');
});

function generarContenedoresMeses(secondContainerFacturacion, tipo) {
    const fechaInicio = new Date(fechaInicioInput.value);
    const fechaFin = new Date(fechaFinInput.value);

    if (fechaInicio && fechaFin && fechaInicio <= fechaFin) {
        // Limpiar contenido anterior
        secondContainerFacturacion.innerHTML = '';
        const valoresMeses = (tipo === 'facturacion') ? valoresMesesFacturacion : valoresMesesTiempos;

        // Guardar valores actuales antes de sobrescribir
        guardarValoresActuales(secondContainerFacturacion, valoresMeses, tipo);

        const meses = obtenerMesesEnRango(fechaInicio, fechaFin);
        if (meses.length > 0) {
            let secondContainerFacturacionHtml = `
                <div class="content-title-month">
                    ${meses.map(mes => `<span data-year="${mes.anio}">${mes.nombre}</span>`).join('')}
                </div>
                <div class="content-inputs">
                    <div class="content projected">
                        ${meses.map(mes => `
                            <input type="number" class="input-projected-${tipo}" placeholder="$0" value="${valoresMeses[mes.nombre]?.proyectada || ''}">
                        `).join('')}
                    </div>
                    <div class="content real">
                        ${meses.map(mes => `
                            <input type="number" class="input-real-${tipo}" placeholder="$0" value="${valoresMeses[mes.nombre]?.real || ''}">
                        `).join('')}
                    </div>
                </div>
                <div class="percent">
                    ${meses.map(mes => `<span class="month-percent-${tipo}" data-month="${mes.nombre}">%</span>`).join('')}
                </div>
            `;

            // Agregar contenido a secondContainerFacturacion
            secondContainerFacturacion.innerHTML = secondContainerFacturacionHtml;

            // Inputs ocultos para cada mes
            meses.forEach(mes => {
                secondContainerFacturacion.innerHTML += `
                <div class="factura">
                    <input type="hidden" name="valores_${tipo}[${mes.nombre}][mes]" value="${mes.nombre}">
                    <input type="hidden" name="valores_${tipo}[${mes.nombre}][proyectada]" value="${valoresMeses[mes.nombre]?.proyectada || 0}">
                    <input type="hidden" name="valores_${tipo}[${mes.nombre}][real]" value="${valoresMeses[mes.nombre]?.real || 0}">
                </div>
                `;
            });

            // Generar HTML para el total
            let thirdContainer = (tipo === 'facturacion') ? thirdContainerFacturacion : thirdContainerTiempos;
            let thirdContainerHtml = `
                <div class="back-total-${tipo}">Total</div>
                <div class="total-inputs-${tipo}">
                    <div class="total-projected-${tipo}">
                        <span class="total-projected-value-${tipo}">0</span> <!-- Total proyectado -->
                    </div>
                    <div class="total-real-${tipo}">
                        <span class="total-real-value-${tipo}">0</span> <!-- Total real -->
                    </div>
                </div>
                <div class="total-percent-${tipo}">
                    <span class="total-percent-value-${tipo}">0</span> % <!-- Porcentaje -->
                </div>
            `;

            // Agregar contenido a thirdContainer
            thirdContainer.innerHTML = thirdContainerHtml;

            // Agregar evento para calcular totales
            secondContainerFacturacion.addEventListener('input', () => calcularTotales(secondContainerFacturacion, tipo));
            calcularTotales(secondContainerFacturacion, tipo); // Calcular totales iniciales
        }
    } else {
        // Mensaje inicial si las fechas no son válidas
        secondContainerFacturacion.innerHTML = '<p class="mensaje-inicial">Seleccione un rango de fechas para desplegar los meses.</p>';
    }
}

function guardarValoresActuales(secondContainerFacturacion, valoresMeses, tipo) {
    const projectedInputs = secondContainerFacturacion.querySelectorAll(`.input-projected-${tipo}`);
    const realInputs = secondContainerFacturacion.querySelectorAll(`.input-real-${tipo}`);

    projectedInputs.forEach((input, index) => {
        const mesNombre = secondContainerFacturacion.querySelectorAll('.content-title-month span')[index].textContent;
        valoresMeses[mesNombre] = valoresMeses[mesNombre] || {};
        valoresMeses[mesNombre].proyectada = input.value; // Guardar valor proyectado
    });

    realInputs.forEach((input, index) => {
        const mesNombre = secondContainerFacturacion.querySelectorAll('.content-title-month span')[index].textContent;
        valoresMeses[mesNombre] = valoresMeses[mesNombre] || {};
        valoresMeses[mesNombre].real = input.value; // Guardar valor real
    });
}

function obtenerMesesEnRango(fechaInicio, fechaFin) {
    const meses = [];
    const mesInicio = fechaInicio.getMonth();
    const anioInicio = fechaInicio.getFullYear();
    const diaInicio = fechaInicio.getDate();
    const mesFin = fechaFin.getMonth();
    const anioFin = fechaFin.getFullYear();
    const diaFin = fechaFin.getDate();

    let anioActual = anioInicio;
    let mesActual = mesInicio;
    let diaActual = diaInicio;

    while (anioActual < anioFin || (anioActual === anioFin && mesActual <= mesFin)) {
        const fecha = new Date(anioActual, mesActual, diaActual);
        const mesAbreviado = fecha.toLocaleString('es-ES', { month: 'short' });
        const fechaFormateada = `${anioActual}-${mesAbreviado}`;

        meses.push({
            nombre: fechaFormateada,
            anio: anioActual
        });

        mesActual++;
        if (mesActual > 11) {
            mesActual = 0;
            anioActual++;
        }

        if (anioActual === anioFin && mesActual === mesFin) {
            diaActual = diaFin;
        }
    }

    return meses;
}

function calcularTotales(secondContainerFacturacion, tipo) {
    const projectedInputs = secondContainerFacturacion.querySelectorAll(`.input-projected-${tipo}`);
    const realInputs = secondContainerFacturacion.querySelectorAll(`.input-real-${tipo}`);
    const percentElements = secondContainerFacturacion.querySelectorAll(`.month-percent-${tipo}`);

    let totalProjected = 0;
    let totalReal = 0;

    projectedInputs.forEach(input => {
        totalProjected += parseFloat(input.value) || 0; // Sumar solo si es un número
    });

    realInputs.forEach(input => {
        totalReal += parseFloat(input.value) || 0; // Sumar solo si es un número
    });

    // Mostrar totales en formato de moneda COP
    document.querySelector(`.total-projected-value-${tipo}`).textContent = totalProjected.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
    document.querySelector(`.total-real-value-${tipo}`).textContent = totalReal.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });

    // Calcular y mostrar porcentaje total
    const percent = (totalProjected > 0) ? (totalReal / totalProjected) * 100 : 0;
    document.querySelector(`.total-percent-value-${tipo}`).textContent = percent > 0 ? percent.toFixed(0) + '%' : '0%';

    // Actualizar porcentajes individuales de cada mes
    percentElements.forEach((el, index) => {
        const projectedValue = parseFloat(projectedInputs[index].value) || 0;
        const realValue = parseFloat(realInputs[index].value) || 0;
        const percentIndividual = (projectedValue > 0) ? (realValue / projectedValue) * 100 : 0;
        el.textContent = percentIndividual > 0 ? percentIndividual.toFixed(0) + '%' : '0%';
    });
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
    let facturacionData = Array.from(secondContainerFacturacion.querySelectorAll('.factura')).map((factura, index) => {
        const mes = secondContainerFacturacion.querySelectorAll('.content-title-month span')[index].textContent; // Mes del título
        const proyectada = secondContainerFacturacion.querySelectorAll('.input-projected-facturacion')[index].value; // Facturación proyectada
        const real = secondContainerFacturacion.querySelectorAll('.input-real-facturacion')[index].value; // Facturación real

        return {
            mes, // Mes de facturación
            proyectada: proyectada || '', // Facturación proyectada
            real: real || '' // Facturación real
        };
    });

    // Obtener datos del tercer formulario (Tiempos)
    let tiemposData = Array.from(secondContainerTiempos.querySelectorAll('.factura')).map((factura, index) => {
        const mes = secondContainerTiempos.querySelectorAll('.content-title-month span')[index].textContent; // Mes del título
        const proyectada = secondContainerTiempos.querySelectorAll('.input-projected-tiempos')[index].value; // Tiempos proyectada
        const real = secondContainerTiempos.querySelectorAll('.input-real-tiempos')[index].value; // Tiempos real

        return {
            mes, // Mes de tiempos
            proyectada: proyectada || '', // Tiempos proyectada
            real: real || '' // Tiempos real
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
            facturacion: facturacionData, // Agregar la facturación al request
            tiempos: tiemposData // Agregar los tiempos al request
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
        });
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

