@extends('layouts.app') <!-- Asegúrate de que estás extendiendo la plantilla principal -->

@section('title', 'Editar Rol de Usuario')

@push('styles')
    <link rel="stylesheet" href="{{ asset('css/edit-role.css') }}">
@endpush

@section('content')
    <div class="container">
        <!-- Enlace de regreso a la lista de usuarios -->
        <a href="{{ route('users.index') }}" class="btn btn-link">
            <i class="fas fa-arrow-left"></i> Volver a la lista de usuarios
        </a>

        <h1>Editar Rol de Usuario</h1>

        <form action="{{ route('users.updateRole', $user->id) }}" method="POST">
            @csrf
            <div class="form-group">
                <label for="name">Nombre del Usuario:</label>
                <input type="text" class="form-control" value="{{ $user->name }}" disabled>
            </div>

            <div class="form-group">
                <label for="role">Selecciona un Rol:</label>
                <select name="role_id" class="form-control" id="role">
                    @foreach($roles as $role)
                        <option value="{{ $role->id }}" {{ $user->role_id == $role->id ? 'selected' : '' }}>
                            {{ $role->name }}
                        </option>
                    @endforeach
                </select>
            </div>

            <button type="submit" class="btn btn-success">Actualizar Rol</button>
        </form>
    </div>
@endsection
