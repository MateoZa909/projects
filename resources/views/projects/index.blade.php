@extends('layouts.app')

@section('title', 'Constructor de proyectos')

@push('styles')
    <link rel="stylesheet" href="{{ asset('css/proyectos.css') }}">
    <link rel="stylesheet" href="{{ asset('css/facturacion-table.css') }}">
    <link rel="stylesheet" href="{{ asset('css/tiempos.css') }}">
    <link rel="stylesheet" href="{{ asset('css/costos.css') }}">

    <!-- SweetAlert2 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet">
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

    <form id="project-form" action="{{ route('projects.store') }}" method="POST">
    @csrf
    <div class="accordion accordion-flush" id="accordionFlushExample">
        <!-- Primer Item | Detalles Proyecto -->
        <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingOne">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                    Detalles Proyecto
                </button>
            </h2>
            <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                    <!-- Primer Formulario -->
                    @include('projects.detalles-proyecto.detalle-proyecto')
                </div>
            </div>
        </div>

        <!-- Segundo Item | Facturación -->
        <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingTwo">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                    Facturación
                </button>
            </h2>
            <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                    <x-tabla-fija
                        paso="Paso 2"
                        :textoPaso="'En los siguientes campos digite la información de facturación y diligencie los campos base'"
                        :nameTable="'Facturación'"
                    />
                </div>
            </div>
        </div>
    </div>

    <div class="back-btn">
        <!-- Botón de guardar dentro del formulario -->
        <button id="guardar-btn" type="submit" class="btn btn-primary">Guardar</button>
    </div>
    </form>

    </div>

@endsection

<!-- Jquery -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<script src="{{ asset('js/detalles-proyecto.js') }}"></script>

<!-- SweetAlert2 JS -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
