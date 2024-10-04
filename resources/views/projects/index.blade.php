@extends('layouts.app')

@section('title', 'Constructor de proyectos')

@push('styles')
    <link rel="stylesheet" href="{{ asset('css/proyectos.css') }}">
    <link rel="stylesheet" href="{{ asset('css/facturacion-table.css') }}">

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
        <form id="form-unifed" action="{{ route('projects.store') }}" method="POST">
            @csrf
            <!-- Primer Formulario -->
            <div class="container proyecto-data">
                <div class="info-fill"> <!-- Contenedor texto -->
                    <p>En los siguientes campos digite la información y elija el rango de fechas:</p>
                </div>

                <div class="row g-3">
                    <div class="col-md-6 content-one"> <!-- Primer columna -->
                        <div class="content-one">
                            <div class="row mb-3"> <!-- Fila para los primeros tres campos -->
                                <div class="col-md-4"> <!-- Columna para Nombre del proyecto -->
                                    <label for="nombre-proyecto">Nombre del proyecto</label>
                                    <input type="text" id="nombre-proyecto" name="nombre_proyecto" class="form-control" required>
                                </div>
                                <div class="col-md-4"> <!-- Columna para Empresa -->
                                    <label for="empresa">Empresa</label>
                                    <select name="com_ncode" id="empresa" class="select-empresa" required>
                                        @foreach ($empresas as $empresa)
                                            <option value="{{ $empresa->COM_NCODE }}">{{ $empresa->COM_CNAME }}</option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="col-md-4"> <!-- Columna para Encargado -->
                                    <label for="encargado">Encargado</label>
                                    <select name="stf_ncode_incharge" id="encargado" class="select-encargado" required>
                                        @foreach ($encargados as $encargado)
                                            <option class="text-black" value="{{ $encargado->STF_NCODE }}">{{ $encargado->STF_CNAME }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>

                            <div class="row"> <!-- Fila para los campos restantes -->
                                <div class="col-md-4"> <!-- Columna para Fecha asignación -->
                                    <label for="asignacion">Fecha asignación</label>
                                    <input type="date" name="pro_dassignment" id="asignacion" required>
                                </div>
                                <div class="col-md-4"> <!-- Columna para Estado -->
                                    <label for="estado">Estado</label>
                                    <select name="sta_ncode" id="estado" required>
                                        @foreach ($estados as $estado)
                                            <option value="{{ $estado->STA_NCODE }}">{{ $estado->STA_CNAME }}</option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="col-md-4"> <!-- Columna para Supervisor -->
                                    <label for="supervisor">Supervisor</label>
                                    <select name="stf_ncode_supervisor" id="supervisor" required>
                                        @foreach ($encargados as $encargado)
                                            <option class="text-black" value="{{ $encargado->STF_NCODE }}">{{ $encargado->STF_CNAME }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="content-two"> <!-- Segunda columna -->
                        <div>
                            <label for="fecha_inicio">Fecha de Inicio</label>
                            <input type="date" name="pro_dstart" id="fecha_inicio" required>
                        </div>

                        <div>
                            <label for="fecha_fin">Fecha de Fin</label>
                            <input type="date" name="pro_dend" id="fecha_fin" required>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Componente de Facturación -->
            <div class="content-billing">
                <input type="hidden" name="proyecto" value="{{ $proyectos }}">
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
            </div>
            
            <div class="btn-save">
                <button id="guardar-btn" type="submit">Guardar</button>
            </div>
        </form>
    </div>

    <script src="{{ asset('js/facturacion.js') }}"></script>
@endsection



<!-- SweetAlert2 JS -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
