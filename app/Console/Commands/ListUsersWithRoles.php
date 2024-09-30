<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;

class ListUsersWithRoles extends Command
{
    protected $signature = 'users:roles';
    protected $description = 'List all users with their roles';

    public function handle()
    {
        $users = User::with('role')->get(); // Asegúrate de que la relación 'role' esté definida en tu modelo User

        $this->info("Users with their Roles:");
        foreach ($users as $user) {
            $this->info("User: {$user->name} | Role: " . ($user->role ? $user->role->name : 'No role assigned'));
        }
    }
}
