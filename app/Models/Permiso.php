<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Permiso extends Model
{
    protected $primaryKey = 'permiso_id';
    public $timestamps = false;

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'roles_permisos', 'permiso_id', 'rol_id');
    }
}
