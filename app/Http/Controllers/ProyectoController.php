<?php

namespace App\Http\Controllers;

use App\Models\ProBilling;
use App\Models\ProCompany;
use App\Models\ProProject;
use App\Models\ProStaff;
use App\Models\ProState;
use Illuminate\Http\Request;

class ProyectoController extends Controller
{
    // Método para mostrar la vista de proyectos
    public function index()
    {
        // Obtener todas las empresas
        $empresas = ProCompany::all();

        // Obtener todos los encargados
        $encargados = ProStaff::all();

        // Obtener todos los estados
        $estados = ProState::all();

        // Obtener todos los proyectos
        $proyectos = ProProject::all(); 

        return view('projects.index', compact('empresas', 'encargados', 'estados', 'proyectos'));
    }

    // Método para almacenar un nuevo proyecto
    public function store(Request $request)
    {
        // Validación de los datos del formulario
        $request->validate([
            'nombre_proyecto' => 'required|string|max:255',
            'com_ncode' => 'required|integer|exists:PRO_COMPANY,COM_NCODE',
            'stf_ncode_incharge' => 'required|integer',
            'pro_dassignment' => 'required|date',
            'sta_ncode' => 'required|integer',
            'stf_ncode_supervisor' => 'required|integer',
            'pro_dstart' => 'required|date',
            'pro_dend' => 'required|date|after_or_equal:pro_dstart',
            'valores' => 'required|array',
            'valores.*.mes' => 'required|string',
            'valores.*.proyectada' => 'required|numeric',
            'valores.*.real' => 'required|numeric',
        ]);

        // Crear un nuevo proyecto con los datos del formulario
        $proyecto = ProProject::create([
            'PRO_CNAME' => $request->nombre_proyecto,
            'COM_NCODE' => $request->com_ncode,
            'STF_NCODE_INCHARGE' => $request->stf_ncode_incharge,
            'PRO_DASSIGNMENT' => $request->pro_dassignment,
            'STA_NCODE' => $request->sta_ncode,
            'STF_NCODE_SUPERVISOR' => $request->stf_ncode_supervisor,
            'PRO_DSTART' => $request->pro_dstart,
            'PRO_DEND' => $request->pro_dend,
            'PRO_DCREATE' => now(),
        ]);

        // Guardar los valores de facturación
        foreach ($request->valores as $valor) {
            ProBilling::create([
                'PRO_NCODE' => $proyecto->PRO_NCODE, // Asegúrate de que esta propiedad existe
                'BIL_MONTH' => $valor['mes'],
                'BIL_PROJECTED' => $valor['proyectada'],
                'BIL_REAL' => $valor['real'],
                'BIL_DCREATED' => now(),
            ]);
        }

        // Redirigir a la lista de proyectos con un mensaje de éxito
        return back()->with('success', 'Proyecto creado con éxito.');
    }

    public function guardarValores(Request $request)
    {
        // Validar los datos
        $validatedData = $request->validate([
            'meses' => 'required|array',
            'meses.*.nombre' => 'required|string',
            'meses.*.proyectada' => 'required|numeric',
            'meses.*.real' => 'required|numeric',
        ]);

        // Recorrer cada mes y guardar en la base de datos
        foreach ($validatedData['meses'] as $mes) {
            $billing = new ProBilling();
            $billing->PRO_NCODE = $request->proyecto_id; // Suponiendo que pasas el ID del proyecto
            $billing->BIL_MONTH = $mes['nombre'];
            $billing->BIL_PROJECTED = $mes['proyectada'];
            $billing->BIL_REAL = $mes['real'];
            $billing->save();
        }

        return response()->json(['message' => 'Valores guardados correctamente']);
    }

}
