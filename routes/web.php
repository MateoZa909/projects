<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\FacturacionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\RolespermisoController;
use App\Http\Controllers\UserRoleController;
use App\Models\Role;
use App\Http\Controllers\ProyectoController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// Redirigir a la vista dashboard
Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Rutas de registro
Route::get('/register', [RegisteredUserController::class, 'create'])
    ->middleware('guest') // Solo permitir a usuarios no autenticados
    ->name('register');
Route::post('/register', [RegisteredUserController::class, 'store'])
    ->middleware('guest'); // Solo permitir a usuarios no autenticados

// Controlador proyecto
Route::middleware(['auth'])->group(function () {
    Route::get('/proyectos', [ProyectoController::class, 'index'])->name('projects.index');
    Route::get('/proyectos/creados', [ProyectoController::class, 'listaProyectos'])->name('projects.listaProyecto');
    Route::get('/proyectos/{id}', [ProyectoController::class, 'show'])->name('projects.show');
    Route::post('/proyectos', [ProyectoController::class, 'store'])->name('projects.store'); // Ruta para almacenar
});

// Roles
Route::get('/roles', function () {
    $roles = Role::all();

    // Imprimir los roles
    return response()->json($roles); // Retorna los roles en formato JSON
});


// Asignar permisos
Route::get('/asignar-permisos', [RolespermisoController::class, 'asignarPermisos']);

// Edicion de roles
Route::middleware(['auth', 'admin'])->group(function () {
    // Ruta para listar usuarios con sus roles
    Route::get('/admin/users', [UserRoleController::class, 'index'])->name('users.index');
    Route::get('/users/{user}/edit-role', [UserRoleController::class, 'edit'])->name('users.editRole');
    Route::post('/users/{user}/update-role', [UserRoleController::class, 'update'])->name('users.updateRole');
});


require __DIR__.'/auth.php';
