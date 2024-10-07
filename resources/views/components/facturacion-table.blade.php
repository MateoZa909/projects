@props(['texto' => 'Facturación', 'paso' => 'Paso :2'])

@push('styles')
    <link rel="stylesheet" href="{{ asset('css/facturacion-table.css') }}">
    <!-- SweetAlert2 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet">
@endpush

<div class="billing">
    <p class="step"><strong>{{ $paso }}</strong></p>
    <div class="info-fill"> <!-- Contenedor texto -->
        <p>En los siguientes campos digite la información y elija el rango de fechas:</p>
    </div>

    <form id="project-facturacion-form" action="{{ route('projects.store') }}" method="POST">
    @csrf
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

            <div class="second-container">

            </div>

            <div class="third-container">
                <div class="back-total">Total</div>
                <div class="total-inputs">
                    <div class="total-projected">
                        <span class="total-projected-value">0</span>
                    </div>
                    <div class="total-real">
                        <span class="total-real-value">0</span>
                    </div>
                </div>
                <div class="total-percent">
                    <span class="total-percent-value">0</span>
                </div>
            </div>
        </div>

        <!-- <div class="back-btn-two">
            <button type="button" id="guardar-btn-two">Guardar</button>
        </div> -->
    </form>
</div>

<!-- SweetAlert2 JS -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

