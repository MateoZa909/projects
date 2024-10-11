@extends('layouts.app')

@section('title', 'Proyectos en curso')

@push('styles')
    <link rel="stylesheet" href="{{ asset('css/listaProyectos.css') }}">
    <!-- SweetAlert2 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- FontAwesowe -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">

@endpush

@section('content')
    <!-- Info route -->
    <div class="info-route">
        <i class="nav-icon fas fa-home text-muted mt-4"></i>
        <span>Proyecto en curso/</span>
    </div>
    <!-- Titulo -->
    <div class="info-componente">
        <h5 class="fs-6 text-gray-400">Buscar Proyecto</h5>
    </div>

    <!-- Contenedor encontrar proyecto -->
    <div class="proyecto-container mt-4">
        <div class="select-search">
            <!-- Select Proyecto -->
            <select name="nombre_proyecto" id="proyectos-name" class="mt-3">
            @foreach ($proyectos as $proyecto)
                <option class="text-black" value="{{ $proyecto->PRO_CNAME }}">{{ $proyecto->PRO_CNAME }}</option> <!-- Nombres de  -->
            @endforeach
            </select>

            <!-- Buscar -->
            <div class="search-container mt-3">
                <i class="fas fa-search search-icon"></i>
                <input type="search" id="btn-buscar" placeholder="Buscar">
            </div>
        </div>

        <div class="lista-proyectos mt-3 row g-3">
                @foreach ($proyectos as $proyecto)
                    <div class="proyecto col-md-3">
                        <i id="list" class="fa-regular fa-rectangle-list" style="color: #ffff;"></i>
                        <span>{{ $loop->iteration }} - {{  strtoupper($proyecto->PRO_CNAME) }}</span>
                    </div>
                @endforeach
        </div>
    </div>

    <ul>

    </ul>
@endsection
