function processData(datos, encabezadosCategorias, encabezadosMeses) {
    const tabla = {};

    // Crear la estructura de la tabla
    encabezadosCategorias.forEach(categoria => {
        tabla[categoria] = {};
        encabezadosMeses.forEach(mes => {
            // Convertir a número para asegurarnos de que se sumen correctamente
            const valor = parseFloat(datos.find(d => d.categoria === categoria && d.mes.nombre === mes)?.valor) || 0;
            tabla[categoria][mes] = valor;
        });
    });

    // Calcular totales por categoría
    const totalesPorCategoria = {};
    for (const [categoria, valores] of Object.entries(tabla)) {
        totalesPorCategoria[categoria] = Object.values(valores).reduce((acc, val) => acc + val, 0);
    }

    // Calcular totales por mes
    const totalesPorMes = {};
    encabezadosMeses.forEach(mes => {
        totalesPorMes[mes] = 0;
        for (const categoria in tabla) {
            totalesPorMes[mes] += tabla[categoria][mes];
        }
    });

    // Función para formatear números como moneda colombiana
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP'
        }).format(amount);
    };

    // Actualizar la tabla en el DOM
    const tbody = document.querySelector('#tabla-categorias');
    tbody.innerHTML = ''; // Limpiar el contenido existente

    // Agregar Proyectada y Real
    encabezadosCategorias.forEach(categoria => {
        if (categoria !== '% Cumplimiento') { // Asegurarse de que no se procese dos veces
            const row = document.createElement('tr');
            const th = document.createElement('th');
            th.innerText = categoria;
            row.appendChild(th);

            encabezadosMeses.forEach(mes => {
                const td = document.createElement('td');
                td.innerText = formatCurrency(tabla[categoria][mes]); // Formatear como moneda
                row.appendChild(td);
            });

            const totalTd = document.createElement('td');
            totalTd.innerText = formatCurrency(totalesPorCategoria[categoria]); // Formatear como moneda
            row.appendChild(totalTd);

            tbody.appendChild(row);
        }
    });

    // Fila de % Cumplimiento
    const cumplimientoRow = document.createElement('tr');
    const cumplimientoTh = document.createElement('th');
    cumplimientoTh.innerText = '% Cumplimiento';
    cumplimientoRow.appendChild(cumplimientoTh);

    let totalCumplimiento = 0;
    let mesesConDatos = 0;

    encabezadosMeses.forEach(mes => {
        const td = document.createElement('td');
        let cumplimiento = 0;

        // Evitar división por cero y calcular el porcentaje de cumplimiento
        if (tabla["Proyectada"][mes] > 0) {
            const proyectada = tabla["Proyectada"][mes] || 0; // Asumiendo que "Proyectada" es una categoría
            const real = tabla["Real"][mes] || 0; // Asumiendo que "Real" es una categoría
            cumplimiento = (real / proyectada) * 100;
        }

        totalCumplimiento += cumplimiento; // Sumar el cumplimiento del mes al total
        if (cumplimiento > 0) mesesConDatos++; // Contar solo los meses con datos válidos

        td.innerText = `${cumplimiento.toFixed(2)}%`; // Formatear a dos decimales
        cumplimientoRow.appendChild(td);
    });

    // Calcular el total de % Cumplimiento
    const totalTdCumplimiento = document.createElement('td');
    const promedioCumplimiento = (mesesConDatos > 0) ? (totalCumplimiento / mesesConDatos) : 0;
    totalTdCumplimiento.innerText = `${promedioCumplimiento.toFixed(2)}%`; // Formatear a dos decimales
    cumplimientoRow.appendChild(totalTdCumplimiento);

    // Agregar la fila de % Cumplimiento al cuerpo de la tabla (solo una vez)
    tbody.appendChild(cumplimientoRow);
}
