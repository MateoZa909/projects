<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rolespermiso extends Model
{
    protected $table = 'roles_permisos';
    public $timestamps = false;

    public function permiso()
    {
        return $this->belongsTo(Permiso::class, 'permiso_id');
    }

    public function rol()
    {
        return $this->belongsTo(Role::class, 'rol_id');
    }
}
