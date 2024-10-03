@props(['proyecto'])

@push('styles')
    <link rel="stylesheet" href="{{ asset('css/facturacion-table.css') }}">
    <!-- SweetAlert2 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css" rel="stylesheet">
@endpush

<form id="form-facturacion" class="table-responsive" action="{{ route('projects.store') }}" method="POST">
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

    <div class="container-overflow">
        <div class="second-container">

        </div>
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

    <div class="btn-save">
        <button id="guardar-btn" type="submit">Guardar</button>
    </div>
</form>

<script src="{{ asset('js/facturacion.js') }}"></script>

<!-- SweetAlert2 JS -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

