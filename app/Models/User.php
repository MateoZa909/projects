<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function permisos()
    {
        return $this->role->permisos(); // Relación con los permisos a través del rol
    }

    public function tienePermiso($codigo)
    {
        return $this->permisos()->where('codigo', $codigo)->exists();
    }

    public function getRoleNameAttribute()
    {
        return $this->role ? $this->role->name : 'sin rol';
    }
}
