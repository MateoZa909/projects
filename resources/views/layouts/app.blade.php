<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Mi Aplicación')</title>
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/admin-lte/3.1.0/css/adminlte.min.css">
    <!-- Bootstrap -->
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">

    <!-- Jquery & Popper -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

    <!-- Token csrf -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    @stack('styles')
</head>
<body class="hold-transition sidebar-mini">
    <div class="wrapper">
        <!-- Navbar -->
        <nav class="main-header navbar navbar-expand navbar-white navbar-light">
            <!-- Right navbar links -->
            <ul class="navbar-nav ml-auto">
                <!-- Dropdown para roles -->
                <li class="nav-item dropdown">
                    @if(!in_array(auth()->user()->role->name, ['Editor', 'Lectura']))
                        <a class="nav-link dropdown-toggle text-white" href="#" id="rolesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Roles
                        </a>
                    @endif
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="rolesDropdown">
                    <!-- Cambia 'Lectura' por el nombre de rol que quieras usar -->
                            <a class="dropdown-item" href="{{ route('users.index') }}">Ver usuarios y roles</a>
                            <a class="dropdown-item" href="{{ route('users.editRole', auth()->user()->id) }}">Asignar roles</a>
                    </div>
                </li>

                <!-- Cerrar sesión -->
                <li class="nav-item">
                    <form method="POST" action="{{ route('logout') }}">
                        @csrf
                        <button type="submit" class="text-white nav-link btn btn-link">Cerrar sesión</button>
                    </form>
                </li>
            </ul>
        </nav>

        <!-- Sidebar -->
        <aside class="main-sidebar sidebar-dark-primary elevation-4">
            <div class="logo">
                <a href="{{ route('dashboard') }}" class="brand-link">
                    <img src="{{ asset('images/logo-verytel.png') }}" alt="Logo" style="height: 30px;">
                </a>
            </div>

            <div class="sidebar">
                <h2 class="text-center mt-4 mb-3">Control de proyectos</h2>

                <div class="text-center mb-3"> <!-- contenedor centrado con margen abajo -->
                    <div class="rounded-circle bg-white text-white d-flex justify-content-center align-items-center mb-3" style="width: 80px; height: 80px; margin: 0 auto;">
                        <span class="text-primary span-ab">
                            {{ strtoupper(substr(explode(' ', Auth::user()->name)[0], 0, 1)) }}{{ strtoupper(substr(explode(' ', Auth::user()->name)[1] ?? '', 0, 1)) }}
                        </span>

                        </span>
                    </div>
                    <span class="d-block">{{ Auth::user()->name }}</span>
                </div>

                <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu">
                    <li class="nav-item">
                        <!-- <a href="{{ route('projects.index') }}" class="nav-link">
                            <i class="nav-icon fas fa-project-diagram"></i>
                            <p class="projects">Proyectos en curso</p>
                        </a> -->
                        <a href="{{ route('projects.index') }}" class="nav-link">
                            <i class="nav-icon fas fa-project-diagram"></i>
                            <p class="builder">Constructor de proyectos</p>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>

        <!-- Content Wrapper -->
        <div class="content-wrapper">
            <section class="content">
                @yield('content')
            </section>
        </div>

        <!-- Footer -->
        <footer class="main-footer">
            <div class="float-right d-none d-sm-inline">
                <b>Version</b> 3.1.0
            </div>
            <strong>© {{ date('Y') }} Mi Aplicación. Todos los derechos reservados.</strong>
        </footer>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/admin-lte/3.1.0/js/adminlte.min.js"></script>
</body>
</html>
