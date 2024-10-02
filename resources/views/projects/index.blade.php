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

    <!-- Contenedor diligenciamiento de información proyecto -->
    <div class="form-fields">
        <div class="info-fill"> <!-- Contenedor texto -->
            <p>En los siguientes campos digite la información y elija el rango de fechas:</p>
        </div>

        <form id="form-proyecto" action="{{ route('projects.store') }}" method="POST">
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

        </form>

    </div>

    <!-- Componente de Facturación -->
    <div class="content-billing">
        @component('components.facturacion-table', ['proyecto' => $proyectos])
        @endcomponent
    </div>

    <!-- Logica manejo de rango de fechas y calculos -->
    <!-- <script src="{{ asset('js/facturacion.js') }}"></script> -->

    <!-- <script>
        function enviarDatos() {
            const projectedInputs = document.querySelectorAll('.input-projected');
            const realInputs = document.querySelectorAll('.input-real');

            const datos = Array.from(projectedInputs).map((input, index) => ({
                mes: secondContainer.querySelectorAll('.content-title-month span')[index].textContent,
                proyectada: parseFloat(input.value) || 0,
                real: parseFloat(realInputs[index].value) || 0
            }));

            fetch('/facturacion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content') // Token CSRF para Laravel
                },
                body: JSON.stringify(datos)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Datos guardados:', data);
            })
            .catch(error => {
                console.error('Error al guardar:', error);
            });
        }

        // Llama a enviarDatos cuando desees guardar (por ejemplo, al cambiar un valor)
        secondContainer.addEventListener('input', enviarDatos);
    </script> -->
@endsection
