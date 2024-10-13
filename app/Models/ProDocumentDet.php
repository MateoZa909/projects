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
        'DEL_YYYYMM',
        'DOC_MONTH',
        'DOC_QUANTITY',
        'USER_ID_CREATED'
    ];

    // Clave primaria es autoincremental
    public $incrementing = true;

    // Tipo de la clave primaria
    protected $keyType = 'int';

    // Relación con la tabla PRO_DOCUMENT_ENC
    public function documentEnc()
    {
        return $this->belongsTo(ProDocumentEnc::class, 'DOCE_NCODE');
    }
}
