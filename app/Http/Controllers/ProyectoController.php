<?php

namespace App\Http\Controllers;

use App\Models\ProProject;
use Illuminate\Http\Request;

class ProyectoController extends Controller
{
    // Método para mostrar la vista de proyectos
    public function index()
    {
        // Aquí puedes obtener datos adicionales si es necesario
        $datos = []; // Puedes cargar datos de la base de datos si es necesario
        $encabezadosCategorias = []; // Cargar encabezados de categorías
        $encabezadosMeses = []; // Cargar encabezados de meses

        return view('projects.index', compact('datos', 'encabezadosCategorias', 'encabezadosMeses'));
    }

    // Método para almacenar un nuevo proyecto
    public function store(Request $request)
    {
        // Validación de los datos del formulario
        $request->validate([
            'nombre_proyecto' => 'required|string|max:255',
            'com_ncode' => 'required|integer|exists:PRO_COMPANY,COM_NCODE', // Verifica que el ID exista
            'stf_ncode_incharge' => 'required|integer', // ID del encargado
            'pro_dassignment' => 'required|date',
            'sta_ncode' => 'required|integer', // ID del estado
            'stf_ncode_supervisor' => 'required|integer', // ID del supervisor
            'pro_dstart' => 'required|date',
            'pro_dend' => 'required|date',
        ]);

        // Crear un nuevo proyecto con los datos del formulario
        ProProject::create([
            'PRO_CNAME' => $request->nombre_proyecto,
            'COM_NCODE' => $request->com_ncode, // ID de la empresa
            'STF_NCODE_INCHARGE' => $request->stf_ncode_incharge, // ID del encargado
            'PRO_DASSIGNMENT' => $request->pro_dassignment, // Fecha de asignación
            'STA_NCODE' => $request->sta_ncode, // ID del estado
            'STF_NCODE_SUPERVISOR' => $request->stf_ncode_supervisor, // ID del supervisor
            'PRO_DSTART' => $request->pro_dstart, // Fecha de inicio
            'PRO_DEND' => $request->pro_dend, // Fecha de fin
            'PRO_DCREATED' => now(), // Fecha de creación
        ]);

        // Redirigir a la lista de proyectos con un mensaje de éxito
        // return redirect()->route('projects.index')->with('success', 'Proyecto creado con éxito.');
        return back()->with('success', 'Proyecto creado con éxito.');
    }

}
