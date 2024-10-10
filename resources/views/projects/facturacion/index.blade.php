@push('styles')
    <link rel="stylesheet" href="{{ asset('css/facturacion-table.css') }}">
    <!-- SweetAlert2 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet">
@endpush

<div class="billing">
    <p class="step"><strong>Paso 2</strong></p>
    <div class="info-fill"> <!-- Contenedor texto -->
        <p>En los siguientes campos digite la información de facturación y diligencie los campos base</p>
    </div>

        <div class="content-billing">
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

            <div class="second-container" id="facturac">

            </div>

            <div class="factura-third-container">
                <div class="factura-back-total">Total</div>
                <div class="factura-total-inputs">
                    <div class="factura-total-projected">
                        <span class="factura-span-projected">$0,00</span>
                    </div>
                    <div class="factura-total-real">
                    <span class="factura-span-real">$0,00</span>
                    </div>
                </div>
                <div class="factura-total-percent">
                    <span class="factura-span-percent">%</span>
                </div>
            </div>
        </div>
</div>

<script src="{{ asset('js/facturacion.js') }}"></script>

<!-- SweetAlert2 JS -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

