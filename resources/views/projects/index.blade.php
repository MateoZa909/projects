@extends('layouts.app')

@section('title', 'Constructor de proyectos')

@push('styles')
    <link rel="stylesheet" href="{{ asset('css/proyectos.css') }}">
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

    <!-- CONTENEDOR RELLENO DE INFORMACION DEL PROYECTO -->
    <div class="form-fields">
        <div class="info-fill"> <!-- Contenedor texto -->
            <p>En los siguientes campos digite la información y elija el rango de fechas:</p>
        </div>

        <form action="{{ route('projects.store') }}" method="POST">
            @csrf
            <div class="container">
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
                                        <option value="1">IAS Technology</option>
                                        <option value="2">Frisson Tech</option>
                                        <!-- Asegúrate de usar los IDs correctos para COM_NCODE -->
                                    </select>
                                </div>
                                <div class="col-md-4"> <!-- Columna para Encargado -->
                                    <label for="encargado">Encargado</label>
                                    <select name="stf_ncode_incharge" id="encargado" class="select-encargado" required>
                                        <option value="1">Alejandro Bello</option>
                                        <option value="2">Cesar Pajoy</option>
                                        <!-- Asegúrate de usar los IDs correctos para STF_NCODE_INCHARGE -->
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
                                        <option value="1">Activo</option>
                                        <option value="2">Inactivo</option>
                                        <!-- Asegúrate de usar los IDs correctos para STA_NCODE -->
                                    </select>
                                </div>
                                <div class="col-md-4"> <!-- Columna para Supervisor -->
                                    <label for="supervisor">Supervisor</label>
                                    <select name="stf_ncode_supervisor" id="supervisor" required>
                                        <option value="1">Alejandro Bello</option>
                                        <option value="2">Cesar Pajoy</option>
                                        <!-- Asegúrate de usar los IDs correctos para STF_NCODE_SUPERVISOR -->
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

            <div class="btn-save">
                <button type="submit">Guardar</button>
            </div>
        </form>

    </div>

    <div class="content-billing">
        <!-- Componente de Facturación -->
        @component('components.facturacion-table', [
                'datos' => $datos,
                'encabezadosCategorias' => $encabezadosCategorias,
                'encabezadosMeses' => $encabezadosMeses,
        ]) @endcomponent
    </div>


    <script src="{{ asset('js/facturacion.js') }}"></script>

    <script>
       // Pasar datos desde PHP a JavaScript
        const datos = @json($datos);
        const encabezadosCategorias = @json($encabezadosCategorias); // Asegúrate de que esto sea un array
        const encabezadosMeses = @json($encabezadosMeses);

        console.log(encabezadosCategorias); // Verifica qué hay aquí
        console.log(Array.isArray(encabezadosCategorias)); // Esto debería imprimir "true"

        // Aquí puedes llamar a una función para procesar los datos
        processData(datos, encabezadosCategorias, encabezadosMeses);

    </script>
@endsection
