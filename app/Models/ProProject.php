<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProProject extends Model
{
    use HasFactory;

    // Ta tabla asociada
    protected $table = 'PRO_PROJECT';

    // Clave primaria
    protected $primaryKey = 'PRO_NCODE';

    // No tiene timestamps (created_at y updated_at)
    public $timestamps = false;

    // Define los atributos que se pueden asignar masivamente
    protected $fillable = [
        'PRO_CNAME',
        'COM_NCODE',
        'STF_NCODE_SUPERVISOR',
        'STF_NCODE_INCHARGE',
        'PRO_DASSIGNMENT',
        'STA_NCODE',
        'PRO_DSTART',
        'PRO_DEND',
        'PRO_DCREATED'
    ];

    // Clave primaria es autoincremental
    public $incrementing = true;

    // Tipo de la clave primaria
    protected $keyType = 'int';

    // Relaciones con otras tablas
    public function company()
    {
        return $this->belongsTo(ProCompany::class, 'COM_NCODE');
    }

    public function supervisor()
    {
        return $this->belongsTo(ProStaff::class, 'STF_NCODE_SUPERVISOR');
    }

    public function incharge()
    {
        return $this->belongsTo(ProStaff::class, 'STF_NCODE_INCHARGE');
    }

    public function state()
    {
        return $this->belongsTo(ProState::class, 'STA_NCODE');
    }
}
