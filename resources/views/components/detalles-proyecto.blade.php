@push('styles')
    <link rel="stylesheet" href="{{ asset('css/proyectos.css') }}">
    <!-- SweetAlert2 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css" rel="stylesheet">

@endpush
<meta name="csrf-token" content="{{ csrf_token() }}">

<div class="container proyecto-data">
    <p class="step"><strong>Paso 1:</strong></p>
    <div class="info-fill"> <!-- Contenedor texto -->
        <p>En los siguientes campos digite la información y elija el rango de fechas:</p>
    </div>

    <form id="project-details-form" action="{{ route('projects.store') }}" method="POST">
        @csrf
        <!-- <input type="hidden" name="project_id" id="project_id">  -->
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
            <!-- <div class="back-btn">
                <button type="button" id="guardar-btn">Guardar</button>
            </div> -->
    </form>
</div>

<!-- Script -->
<!-- <script src="{{ asset('js/detalles-proyecto.js') }}"></script> -->

<!-- Jquery -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<!-- SweetAlert2 JS -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

