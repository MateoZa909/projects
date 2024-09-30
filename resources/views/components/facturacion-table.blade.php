@push('styles')
    <link rel="stylesheet" href="{{ asset('css/FinantialTableStyles.css') }}">
    <link rel="stylesheet" href="{{ asset('css/facturacion-table.css') }}">
@endpush


<div class="table-responsive">
        <!-- <div class="first-container">
            <div class="back facturacion">
                <span>Facturación</span>
            </div>

            <div class="back proyectada-real">
                <span>Proyectada</span>
                <span>Real</span>
            </div>

            <div class="back cumplimiento">
                <span>% Cumplimiento</span>
            </div>
        </div>

        <div class="second-container">
            @php
                $meses = ['Ene', 'Feb', 'Mar', 'Abr', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
            @endphp


            <div class="back-mes">
                @foreach ($meses as $mes)
                    <span>{{ $mes }}</span>
                @endforeach
            </div>

            <div class="inputs-proyectada">
                @for ($i = 1; $i <= 12; $i++)
                    <input type="number" name="mes_{{ $i }}_proyectada" placeholder="Mes {{ $i }}" >
                @endfor
            </div>
        </div>

        <div class="third-container">
            <div class="back-total">Total</div>
        </div> -->
    <table border="1">
        <thead>
            <tr>
                <th></th> <!-- Encabezado vacío para las categorías -->
                @foreach($encabezadosMeses as $mes)
                    <th>{{ $mes }}</th>
                @endforeach
                <th>Total</th>
            </tr>
        </thead>
        <tbody id="tabla-categorias">
            @foreach($encabezadosCategorias as $categoria)
                <tr>
                    <th>{{ $categoria }}</th> <!-- Categoría -->
                    @foreach($encabezadosMeses as $mes)
                        <td id="{{ $categoria }}-{{ $mes }}" data-categoria="{{ $categoria }}" data-mes="{{ $mes }}">0</td>
                    @endforeach
                    <td id="{{ $categoria }}-total">0</td> <!-- Total de la categoría -->
                </tr>
            @endforeach

            <!-- Fila de % Cumplimiento -->
            <tr>
                <th>% Cumplimiento</th>
                @foreach($encabezadosMeses as $mes)
                    <td id="cumplimiento-{{ $mes }}">0%</td> <!-- Muestra el % de cumplimiento -->
                @endforeach
                <td></td> <!-- Espacio para el total general -->
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <th>% Cumplimiento</th>
                @foreach($encabezadosMeses as $mes)
                    <td id="total-{{ $mes }}">0</td>
                @endforeach
                <td></td> <!-- Espacio para el total general -->
            </tr>
        </tfoot>
    </table>
</div>

<script src="{{ asset('js/facturacion.js') }}"></script>
<script>
    // Pasar datos desde PHP a JavaScript
    const datos = @json($datos);
    const encabezadosCategorias = @json($encabezadosCategorias);
    const encabezadosMeses = @json($encabezadosMeses);

    // Llamar a la función para procesar los datos
    const { tabla, totalesPorCategoria, porcentajeCumplimiento } = processData(datos, encabezadosCategorias, encabezadosMeses);

    // Llenar la tabla con los datos procesados
    const tbody = document.getElementById('facturacion-body');

    for (const [categoria, valores] of Object.entries(tabla)) {
        const tr = document.createElement('tr');
        const th = document.createElement('th');
        th.textContent = categoria; // Categoría
        tr.appendChild(th);

        encabezadosMeses.forEach(mes => {
            const td = document.createElement('td');
            td.textContent = valores[mes] || 0; // Valor por mes
            tr.appendChild(td);
        });

        const totalTd = document.createElement('td');
        totalTd.textContent = totalesPorCategoria[categoria] || 0; // Total de la categoría
        tr.appendChild(totalTd);

        tbody.appendChild(tr);
    }

    // Fila de % Cumplimiento
    const trCumplimiento = document.createElement('tr');
    const thCumplimiento = document.createElement('th');
    thCumplimiento.textContent = '% Cumplimiento';
    trCumplimiento.appendChild(thCumplimiento);

    encabezadosMeses.forEach(mes => {
        const tdCumplimiento = document.createElement('td');
        tdCumplimiento.textContent = (porcentajeCumplimiento[categoria][mes] ?? 0) + '%'; // % de cumplimiento
        trCumplimiento.appendChild(tdCumplimiento);
    });

    tbody.appendChild(trCumplimiento);
</script>
