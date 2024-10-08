<?php

namespace App\View\Components;

use Illuminate\View\Component;

class tablaFija extends Component
{
    public $paso;
    public $textoPaso;
    public $nameTable;
    public function __construct($paso, $textoPaso, $nameTable)
    {
        $this->paso = $paso;
        $this->textoPaso = $textoPaso;
        $this->nameTable = $nameTable;
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
