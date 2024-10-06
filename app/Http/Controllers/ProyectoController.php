<?php

namespace App\Http\Controllers;

use App\Models\ProBilling;
use App\Models\ProCompany;
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
                'facturacion' => 'required|array',
                'facturacion.*.mes' => 'required|string', // Asegúrate de que cada mes esté presente
                'facturacion.*.proyectada' => 'nullable|numeric', // Proyectada puede estar vacía
                'facturacion.*.real' => 'nullable|numeric', // Real puede estar vacía
            ]);

            Log::info('Validación exitosa.', $request->all());

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
                'USER_ID_CREATED' => auth()->id(), // Aquí asignas el ID del usuario
            ]);

            foreach ($request->facturacion as $factura) {
                $billing = new ProBilling();
                $billing->PRO_NCODE = $proyecto->PRO_NCODE; // Asegúrate de que esta propiedad existe
                $billing->BIL_MONTH = $factura['mes']; // Usar el mes del input oculto
                $billing->BIL_PROJECTED = $factura['proyectada'] ?? 0; // Ajusta esto según la lógica que desees
                $billing->BIL_REAL = $factura['real'] ?? 0; // Ajusta esto según la lógica que desees
                $billing->BIL_DCREATED = now();
                $billing->save();
            }

            Log::info('Proyecto creado.', $proyecto->toArray());

            return response()->json(['project_id' => $proyecto->PRO_NCODE]);
        } catch (\Exception $e) {
            Log::error('Error al guardar el proyecto', [
                'message' => $e->getMessage(),
                'line' => $e->getLine(),
                'file' => $e->getFile(),
                'trace' => $e->getTraceAsString(),
            ]);
            return response()->json(['error' => 'Error al guardar el proyecto.'], 500);
        }
    }


    public function storetwo()
    {

    }



}
