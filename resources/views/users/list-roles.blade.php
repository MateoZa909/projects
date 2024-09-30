@extends('layouts.app')

@section('title', 'Asignar Rol')

@push('styles')
    <link rel="stylesheet" href="{{ asset('css/edit-role.css') }}">
@endpush

@section('content')
    <div class="container">
        <h1>Lista de Usuarios</h1>
        <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Rol Actual</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                @foreach($users as $user)
                <tr>
                    <td>{{ $user->id }}</td>
                    <td>{{ $user->name }}</td>
                    <td>{{ $user->email }}</td>
                    <td>{{ $user->role->name }}</td> <!-- Mostrar el nombre del rol actual -->
                    <td>
                        <a href="{{ route('users.editRole', $user->id) }}" class="btn btn-primary">Editar Rol</a>
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>
@endsection
