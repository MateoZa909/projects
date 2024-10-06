@extends('layouts.app')

@section('title', 'Constructor de proyectos')

@push('styles')
    <link rel="stylesheet" href="{{ asset('css/proyectos.css') }}">
    <link rel="stylesheet" href="{{ asset('css/facturacion-table.css') }}">
    <link rel="stylesheet" href="{{ asset('css/tiempos.css') }}">

    <!-- SweetAlert2 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css" rel="stylesheet">
@endpush

@section('content')
    <!-- Ruta -->
    <div class="info-route">
        <i class="nav-icon fas fa-home text-muted"></i>
        <span>Constructor de proyectos/</span>
    </div>

    <!-- Titulo -->
    <div class="info-componente">
        <h5>Agregar información del proyecto</h5>
    </div>

    <!-- Contenedor diligenciamiento de información proyecto -->
    <div class="form-fields">
            <!-- Primer Formulario -->
            <x-detalles-proyecto :empresas="$empresas" :encargados="$encargados" :estados="$estados" />

            <!-- Componente de Facturación -->
            <x-facturacion-table texto="Facturación" />

            <!-- Componente de Tiempos -->
            <!-- <div class="tiempos">
                <p class="step"><strong>Paso 3:</strong></p>
                <div class="info-fill">
                    <p>En los siguientes campos digite la información y elija el rango de fechas:</p>
                </div>
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

                    <div class="container-overflow-tiempos">
                        <div class="second-container-tiempos">

                        </div>
                    </div>

                    <div class="third-container-tiempos">
                        <div class="back-total-tiempos">Total</div>
                        <div class="total-inputs-tiempos">
                            <div class="total-projected-tiempos">
                                <span class="total-projected-value-tiempos">0</span>
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
            </div> -->

            <!-- Componente de Costos -->

            <!-- <div class="btn-save">
                <button id="guardar-btn" type="submit">Guardar</button>
            </div> -->
    </div>

    <script src="{{ asset('js/detalles-proyecto.js') }}"></script>
    <script src="{{ asset('js/facturacion.js') }}"></script>

@endsection

<!-- SweetAlert2 JS -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
