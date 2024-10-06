<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProDeliverableDet extends Model
{
    use HasFactory;

    // Tabla asociada
    protected $table = 'PRO_DELIVERABLE_DET';

    // Clave primaria
    protected $primaryKey = 'DEL_NCODE';

    // No tiene timestamps (created_at y updated_at)
    public $timestamps = false;

    // Atributos que se pueden asignar masivamente
    protected $fillable = [
        'DELE_NCODE',
        'DEL_MONTH',
        'DEL_QUANTITY',
        'USER_ID_CREATED'
    ];

    // Clave primaria es autoincremental
    protected $incrementing = true;

    // Tipo de la clave primaria
    protected $keyType = 'int';

    // Relación con la tabla PRO_DELIVERABLE_ENC
    public function deliverableEnc()
    {
        return $this->belongsTo(ProDeliverableEnc::class, 'DELE_NCODE');
    }
}
