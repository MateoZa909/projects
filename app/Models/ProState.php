<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProState extends Model
{
    use HasFactory;

    // Tabla asociada
    protected $table = 'PRO_STATE';

    // Clave primaria
    protected $primaryKey = 'STA_NCODE';

    // No tiene timestamps (created_at y updated_at)
    public $timestamps = false;

    // Define los atributos que se pueden asignar masivamente
    protected $fillable = [
        'STA_CNAME',
        'STA_DCREATRE'
    ];

    // Clave primaria es autoincremental
    public $incrementing = true;

    // Tipo de la clave primaria
    protected $keyType = 'int';
}
