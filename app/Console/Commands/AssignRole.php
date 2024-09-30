<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use App\Models\Role;

class AssignRole extends Command
{
    protected $signature = 'role:assign {userId} {roleId}';
    protected $description = 'Assign a role to a user';

    public function handle()
    {
        $userId = $this->argument('userId');
        $roleId = $this->argument('roleId');

        // Validar que el usuario existe
        $user = User::find($userId);
        if (!$user) {
            $this->error('User not found.');
            return;
        }

        // Validar que el rol existe
        $role = Role::find($roleId);
        if (!$role) {
            $this->error('Role not found.');
            return;
        }

        // Asignar el rol al usuario
        $user->role_id = $roleId;
        $user->save();

        $this->info("Role '{$role->name}' assigned to user '{$user->name}' successfully.");
    }
}
