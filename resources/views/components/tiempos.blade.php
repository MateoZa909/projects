@props(['proyecto'])

@push('styles')
    <link rel="stylesheet" href="{{ asset('css/tiempos.css') }}">
    <!-- SweetAlert2 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css" rel="stylesheet">
@endpush

<form id="form-tiempos" class="table-tiempos" action="{{ route('projects.store') }}" method="POST">
    @csrf
    <input type="hidden" name="proyecto" value="{{ $proyecto }}">

    <div class="first-container-tiempos">
        <div class="back tiempos">
            <span>Tiempos</span>
        </div>

        <div class="back proyectada-acumulado-real">
            <span>Proyectada</span>
            <span>Acumulado</span>
            <span>Real</span>
        </div>

        <div class="back cumplimiento">
            <span>% Cumplimiento</span>
        </div>
    </div>

    <div class="container-overflow-tiempos">
        <div class="second-container-tiempos">

        </div>
    </div>

    <div class="third-container-tiempos">
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
    </div>

    <div class="btn-save">
        <button id="guardar-btn" type="submit">Guardar</button>
    </div>
</form>

<script src="{{ asset('js/tiempos.js') }}"></script>

<!-- SweetAlert2 JS -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

