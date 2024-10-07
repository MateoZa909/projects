<?php

namespace App\Http\Controllers;

use App\Models\ProBilling;
use App\Models\ProCompany;
use App\Models\ProCost;
use App\Models\ProProject;
use App\Models\ProStaff;
use App\Models\ProState;
use App\Models\ProTime;
use Illuminate\Http\Request;
use Log;

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
    try {
        // Validación de los datos del formulario (solo los campos necesarios)
        $request->validate([
            'nombre_proyecto' => 'required|string|max:255',
            'com_ncode' => 'required|integer|exists:pro_company,COM_NCODE',
            'stf_ncode_incharge' => 'required|integer|exists:pro_staff,STF_NCODE',
            'pro_dassignment' => 'required|integer',
            'sta_ncode' => 'required|integer|exists:pro_state,STA_NCODE',
            'stf_ncode_supervisor' => 'required|integer|exists:pro_staff,STF_NCODE',
            'pro_dstart' => 'required|date',
            'pro_dend' => 'required|date|after_or_equal:pro_dstart',
            // Validaciones para la tabla BIL
            'bil_month' => 'required|string',
            'bil_projected' => 'required|numeric',
            'bil_real' => 'required|numeric',
            // Validaciones para la tabla TIM
            'tim_month' => 'required|string',
            'tim_projected' => 'required|numeric',
            'tim_real' => 'required|numeric',
            // Validaciones para la tabla COS
            'cos_month' => 'required|string',
            'cos_projected' => 'required|numeric',
            'cos_real' => 'required|numeric',
        ]);

        // Crear el proyecto
        $proyecto = ProProject::create([
            'PRO_CNAME' => $request->nombre_proyecto,
            'COM_NCODE' => $request->com_ncode,
            'STF_NCODE_INCHARGE' => $request->stf_ncode_incharge,
            'PRO_DASSIGNMENT' => $request->pro_dassignment,
            'STA_NCODE' => $request->sta_ncode,
            'STF_NCODE_SUPERVISOR' => $request->stf_ncode_supervisor,
            'PRO_DSTART' => $request->pro_dstart,
            'PRO_DEND' => $request->pro_dend,
            'USER_ID_CREATED' => auth()->id(),
        ]);

        // Crear el registro de BIL
        ProBilling::create([
            'PRO_NCODE' => $proyecto->PRO_NCODE,
            'BIL_MONTH' => $request->bil_month,
            'BIL_PROJECTED' => $request->bil_projected,
            'BIL_REAL' => $request->bil_real,
            'USER_ID_CREATED' => auth()->id(),
        ]);

        // Crear el registro de TIM
        ProTime::create([
            'PRO_NCODE' => $proyecto->PRO_NCODE,
            'TIM_MONTH' => $request->tim_month,
            'TIM_PROJECTED' => $request->tim_projected,
            'TIM_REAL' => $request->tim_real,
            'USER_ID_CREATED' => auth()->id(),
        ]);

        // Crear el registro de COS
        ProCost::create([
            'PRO_NCODE' => $proyecto->PRO_NCODE,
            'COS_MONTH' => $request->cos_month,
            'COS_PROJECTED' => $request->cos_projected,
            'COS_REAL' => $request->cos_real,
            'USER_ID_CREATED' => auth()->id(),
        ]);

        return response()->json(['project_id' => $proyecto->PRO_NCODE, 'message' => 'Proyecto y registros relacionados creados exitosamente.']);
    } catch (\Exception $e) {
        Log::error('Error al guardar el proyecto y sus registros relacionados', [
            'message' => $e->getMessage(),
            'line' => $e->getLine(),
            'file' => $e->getFile(),
            'trace' => $e->getTraceAsString(),
        ]);
        return response()->json(['error' => 'Error al guardar el proyecto y los registros relacionados.'], 500);
    }
}


}
