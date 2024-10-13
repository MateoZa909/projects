@push('styles')
    <link rel="stylesheet" href="{{ asset('css/entregables.css') }}">
    <!-- SweetAlert2 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css" rel="stylesheet">
@endpush

<div class="entregables">
    <p class="step"><strong>Paso 5:</strong></p>
    <div class="info-fill"> <!-- Contenedor texto -->
        <p>Por favor agregar los campos necesarios relacionados con entregables y diligencie los campos base:</p>
    </div>

    <div class="content-entregables">
        <div class="first-container-entregables">
            <div class="back-entregables entregables">
                <span>Entregables</span>
            </div>

            <div class="back-entregables proyectada-real-entregables">
                <span>Proyectada</span>
                <span>Real</span>
            </div>

            <div class="back-entregables cumplimiento-entregables">
                <span>% Cumplimiento</span>
            </div>

            
        </div>

        <div class="second-container-entregables" id="entregables">
            <div class="error-message" id="mensaje-error" >
                Seleccione un rango de fechas para llenar los campos.
            </div>
        </div>

        <div class="third-container-entregables" id="entregablesTotales">
            <div class="back-total-entregables">Total</div>

            <div class="fill">

            </div>

            <div class="total-percent-entregables">
                <span class="total-percent-value-entregables">0</span>
            </div>
        </div>
    </div>
</div>

<script src="{{ asset('js/entregables.js') }}"></script>

<!-- SweetAlert2 JS -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

