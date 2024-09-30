<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProStaff extends Model
{
    use HasFactory;

    // Tabla asociada
    protected $table = 'PRO_STAFF';

    // Clave primaria
    protected $primaryKey = 'STF_NCODE';

    // No tiene timestamps (created_at y updated_at)
    public $timestamps = false;

    // Atributos que se pueden asignar masivamente
    protected $fillable = [
        'STF_CNAME',
        'STF_DCREATRE'
    ];

    protected $incrementing = true;

    protected $keyType = 'int';
}
