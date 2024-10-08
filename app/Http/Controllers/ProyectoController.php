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
            // Obtener el ID del usuario autenticado
            $userId = auth()->id();

            // Verificar si el usuario está autenticado
            if (is_null($userId)) {
                return response()->json(['error' => 'Usuario no autenticado.'], 403);
            }

            // Validación de los datos del formulario
            $request->validate([
                'nombre_proyecto' => 'required|string|max:255',
                'com_ncode' => 'required|integer|exists:pro_company,COM_NCODE',
                'stf_ncode_incharge' => 'required|integer|exists:pro_staff,STF_NCODE',
                'pro_dassignment' => 'required|date',
                'sta_ncode' => 'required|integer|exists:pro_state,STA_NCODE',
                'stf_ncode_supervisor' => 'required|integer|exists:pro_staff,STF_NCODE',
                'pro_dstart' => 'required|date',
                'pro_dend' => 'required|date|after_or_equal:pro_dstart',
                'facturacion' => 'required|array',
                'facturacion.*.bil_month' => 'required|string', // Formato esperado: 'MMM-YYYY'
                'facturacion.*.bil_projected' => 'nullable|numeric', // Asegúrate de que sea un número no negativo
                'facturacion.*.bil_real' => 'nullable|numeric', // Asegúrate de que sea un número no negativo
            ]);

            // Log de los datos del proyecto
            Log::info('Datos del proyecto:', $request->all());

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
                'USER_ID_CREATED' => $userId ?? null,
            ]);

            foreach ($request->facturacion as $item) {
                $billing = ProBilling::create([
                    'PRO_NCODE' => $proyecto->PRO_NCODE,
                    'BIL_MONTH' => $item['bil_month'],
                    'BIL_PROJECTED' => $item['bil_projected'],
                    'BIL_REAL' => $item['bil_real'],
                    'USER_ID_CREATED' => $userId,
                ]);

                // Log de cada registro de facturación creado
                Log::info('Registro de facturación creado:', $billing->toArray());
            }


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
