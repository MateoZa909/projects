@push('styles')
    <link rel="stylesheet" href="{{ asset('css/costos.css') }}">
    <!-- SweetAlert2 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css" rel="stylesheet">
@endpush

<div class="costos">
    <p class="step"><strong>Paso 4:</strong></p>
    <div class="info-fill"> <!-- Contenedor texto -->
        <p>Por favor agregar los campos necesarios relacionados con costos y diligencie los campos base:</p>
    </div>

    <div class="content-costos">
        <div class="first-container-costos">
            <div class="back-costos costos">
                <span>Costos</span>
            </div>

            <div class="back-costos proyectada-real-costos">
                <span>Proyectada</span>
                <span>Real</span>
            </div>

            <div class="back-costos cumplimiento-costos">
                <span>% Cumplimiento</span>
            </div>
        </div>

        <div class="second-container-costos" id="costos">
            <!-- Generación dinámica -->
        </div>

        <div class="third-container-costos">
            <div class="back-total-costos">Total</div>
            <div class="total-inputs-costos">
                <div class="total-projected-costos">
                    <span class="total-projected-value-costos">0</span>
                </div>
                <div class="total-accumulated-costos">
                    <span class="total-accumulated-value-costos">0</span>
                </div>
                <div class="total-real-costos">
                    <span class="total-real-value-costos">0</span>
                </div>
            </div>
            <div class="total-percent-costos">
                <span class="total-percent-value-costos">0</span>
            </div>
        </div>
    </div>
</div>

<script src="{{ asset('js/costos.js') }}"></script>

<!-- SweetAlert2 JS -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

