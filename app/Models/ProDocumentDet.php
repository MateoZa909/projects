<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProDocumentDet extends Model
{
    use HasFactory;

    // Tabla asociada
    protected $table = 'PRO_DOCUMENT_DET';

    // Clave primaria
    protected $primaryKey = 'DOC_NCODE';

    // No tiene timestamps (created_at y updated_at)
    public $timestamps = false;

    // Atributos que se pueden asignar masivamente
    protected $fillable = [
        'DOCE_NCODE',
        'DOC_MONTH',
        'DOC_QUANTITY'
    ];

    // Clave primaria es autoincremental
    protected $incrementing = true;

    // Tipo de la clave primaria
    protected $keyType = 'int';

    // Relación con la tabla PRO_DOCUMENT_ENC
    public function documentEnc()
    {
        return $this->belongsTo(ProDocumentEnc::class, 'DOCE_NCODE');
    }
}
