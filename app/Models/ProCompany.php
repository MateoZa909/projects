<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProCompany extends Model
{
    use HasFactory;

    // Tabla asociada
    protected $table = 'PRO_COMPANY';

    // Clave primaria
    protected $primaryKey = 'COM_NCODE';

    // No tiene timestamps (created_at y updated_at)
    public $timestamps = false;

    // Atributos que se pueden asignar masivamente
    protected $fillable = [
        'COM_CNAME',
        'COM_DCREATRE'
    ];

    // Clave primaria es autoincremental
    public $incrementing = true;

    // Tipo de la clave primaria
    protected $keyType = 'int';
}
