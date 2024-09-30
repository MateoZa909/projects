<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    /**
     * Relación con el modelo User.
     */
    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function getRoles()
    {
        // Obtener todos los roles
        $roles = Role::all();

        // Procesar los roles como sea necesario
        foreach ($roles as $role) {
            // Puedes hacer algo con cada rol, por ejemplo, imprimir su nombre
            echo $role->name;
        }
    }
}
