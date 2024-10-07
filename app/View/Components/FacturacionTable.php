<?php

namespace App\View\Components;

use Illuminate\View\Component;

class FacturacionTable extends Component
{
    public $texto;
    public $paso;

    public function __construct($texto = 'Facturación', $paso = 'Paso 2:')
    {
        $this->texto = $texto;
        $this->paso = $paso;
    }

    public function render()
    {
        return view('components.facturacion-table');
    }
}
