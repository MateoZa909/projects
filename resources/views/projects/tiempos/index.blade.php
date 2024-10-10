@push('styles')
    <link rel="stylesheet" href="{{ asset('css/tiempos.css') }}">
    <!-- SweetAlert2 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css" rel="stylesheet">
@endpush

<div class="tiempos">
    <p class="step"><strong>Paso 3:</strong></p>
    <div class="info-fill"> <!-- Contenedor texto -->
    <p>Por favor agregar los campos necesarios relacionados con tiempos y diligencie los campos base:</p>

    <div class="content-times">
        <div class="first-container-tiempos">
            <div class="back-time tiempos">
                <span>Tiempos</span>
            </div>

            <div class="back-time proyectada-real-tiempos">
                <span>Proyectada</span>
                <span>Acumulado</span>
                <span>Real</span>
            </div>

            <div class="back-time cumplimiento-tiempos">
                <span>% Cumplimiento</span>
            </div>
        </div>

        <div class="second-container-tiempos" id="times">
            <!-- Generación dinámica -->
        </div>

        <div class="third-container-tiempos">
            <div class="back-total-tiempos">Total</div>
            <div class="total-inputs-tiempos">
                <div class="total-projected-tiempos">
                    <span class="total-projected-value-tiempos">0</span>
                </div>
                <div class="total-accumulated-tiempos">
                    <span class="total-accumulated-value-tiempos">0</span>
                </div>
                <div class="total-real-tiempos">
                    <span class="total-real-value-tiempos">0</span>
                </div>
            </div>
            <div class="total-percent-tiempos">
                <span class="total-percent-value-tiempos">0</span>
            </div>
        </div>
    </div>
</div>

<script src="{{ asset('js/tiempos.js') }}"></script>

<!-- SweetAlert2 JS -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

