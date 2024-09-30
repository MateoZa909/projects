<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;

class UserRoleController extends Controller
{
    /**
     * Muestra el formulario para editar el rol de un usuario.
     */
    public function edit(User $user)
    {
        $roles = Role::all(); // Obtener todos los roles
        return view('users.edit-role', compact('user', 'roles')); // Cambia a la vista correcta para editar roles
    }

    /**
     * Actualiza el rol de un usuario en la base de datos.
     */
    public function update(Request $request, User $user)
    {
        // Validar que se seleccione un rol válido
        $request->validate([
            'role_id' => 'required|exists:roles,id',
        ]);

        // Actualizar el rol del usuario
        $user->role_id = $request->role_id;
        $user->save();

        // Redirigir a la página de lista de usuarios en lugar de la misma página de edición
        return redirect()->route('users.index')->with('success', 'Rol actualizado correctamente');
    }

    /**
     * Muestra la lista de usuarios con sus roles.
     */
    public function index()
    {
        $users = User::with('role')->get(); // Cargamos los usuarios con sus roles
        return view('users.list-roles', compact('users'));
    }
}
