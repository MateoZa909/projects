<?php

namespace App\View\Components;

use Illuminate\View\Component;

class tablaFija extends Component
{
    public $paso;
    public $textoPaso;
    public $nameTable;
    public $mostrarAcumulado;

    public $valorProyectado;
    public $valorReal;

    public function __construct($paso, $textoPaso, $nameTable, $mostrarAcumulado = false, $valorProyectado = '$0,00', $valorReal = '0%')
    {
        $this->paso = $paso;
        $this->textoPaso = $textoPaso;
        $this->nameTable = $nameTable;
        $this->mostrarAcumulado = $mostrarAcumulado;
        $this->valorProyectado = $valorProyectado;
        $this->valorReal = $valorReal;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        return view('components.tabla-fija');
    }
}
