<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if (auth()->user() && auth()->user()->role_id === 1) { // Supongamos que el rol de administrador tiene el ID 1
            return $next($request);
        }
        return redirect('/home')->with('error', 'No tienes acceso a esta página');
    }
}
