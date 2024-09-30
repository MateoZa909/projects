<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProDeliverableEnc extends Model
{
    use HasFactory;

    // Tabla asociada
    protected $table = 'PRO_DELIVERABLE_ENC';

    // Clave primaria
    protected $primaryKey = 'DELE_NCODE';

    // No tiene timestamps (created_at y updated_at)
    public $timestamps = false;

    // Atributos que se pueden asignar masivamente
    protected $fillable = [
        'PRO_NCODE',
        'DELE_CNAME',
        'DELE_BUDGET'
    ];

    // Clave primaria es autoincremental
    protected $incrementing = true;

    // Tipo de la clave primaria
    protected $keyType = 'int';

    // Relación con la tabla PRO_PROJECT
    public function project()
    {
        return $this->belongsTo(ProProject::class, 'PRO_NCODE');
    }
}
