@props(['proyecto'])

@push('styles')
    <link rel="stylesheet" href="{{ asset('css/FinantialTableStyles.css') }}">
    <link rel="stylesheet" href="{{ asset('css/facturacion-table.css') }}">
@endpush


<form class="table-responsive" action="{{ route('facturacion.store') }}" method="POST">
    @csrf
    <input type="hidden" name="proyecto" value="{{ $proyecto }}">

        <div class="first-container">
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
            <p class="mensaje-inicial">Seleccione un rango de fechas para desplegar los meses.</p>
        </div>

        <div class="third-container">
            <div class="back-total">Total</div>
            <div class="total-inputs">
                <div class="total-projected">
                    <span class="total-projected-value">0</span> <!-- Mostrar total proyectado -->
                </div>
                <div class="total-real">
                    <span class="total-real-value">0</span> <!-- Mostrar total real -->
                </div>
            </div>
            <div class="total-percent">
                <span class="total-percent-value">0</span> % <!-- Mostrar porcentaje -->
            </div>
        </div>
</form>


<script src="{{ asset('js/facturacion.js') }}"></script>

