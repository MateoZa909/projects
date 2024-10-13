<?php

namespace App\Http\Controllers;
use App\Models\Role;
use Illuminate\Http\Request;

class RolespermisoController extends Controller
{
    public function asignarPermisos()
    {
        // Obtener los roles
        $rol1 = Role::find(1); // Alejandro Bello
        $rol2 = Role::find(2); // Cesar Pajoy

        // Asignar permisos al rol 1
        $rol1->permisos()->sync([1, 2, 3]); // Permisos 1, 2 y 3

        // Asignar permisos al rol 2
        $rol2->permisos()->sync([4]); // Permiso 4

        return response()->json(['message' => 'Permisos asignados exitosamente.']);
    }
}
