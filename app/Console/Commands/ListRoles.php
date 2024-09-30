<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Role; // Asegúrate de importar el modelo Role

class ListRoles extends Command
{
    protected $signature = 'roles:list';
    protected $description = 'List all roles';

    public function handle()
    {
        $roles = Role::all();

        if ($roles->isEmpty()) {
            $this->info('No roles found.');
        } else {
            foreach ($roles as $role) {
                $this->info($role->name); // Imprime el nombre de cada rol en la consola
            }
        }
    }
}
