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

    <link href="https://cdn.jsdelivr.net/npm/simple-datatables@7.1.2/dist/style.min.css" rel="stylesheet" />
    <link href="css/styles.css" rel="stylesheet" />
    <script src="https://use.fontawesome.com/releases/v6.3.0/js/all.js" crossorigin="anonymous"></script>

    @stack('styles')
</head>
<body class="sb-nav-fixed">
        <!-- Navbar Top -->
        <nav class="sb-topnav navbar navbar-expand navbar-grade">
            <!-- Navbar Brand-->
            <a href="{{ route('dashboard') }}" class="brand-link">
                <img src="{{ asset('images/logo-verytel.png') }}" alt="Logo" class="logo-image" style="height: 30px;">
            </a>

            <ul class="navbar-nav ml-auto">
                <!-- Dropdown para roles -->
                <li class="nav-item dropdown role">
                    @if(!in_array(auth()->user()->role->name, ['Editor', 'Lectura']))
                        <a class="nav-link dropdown-toggle text-white" href="#" id="rolesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Roles
                        </a>
                    @endif
                    <div class="dropdown-menu dropdown-menu-right"  aria-labelledby="rolesDropdown">
                            <a class="dropdown-item" href="{{ route('users.index') }}">Ver usuarios y roles</a>
                            <a class="dropdown-item" href="{{ route('users.editRole', auth()->user()->id) }}">Asignar roles</a>
                    </div>
                </li>

                <!-- Cerrar sesión -->
                <li class="nav-item role">
                    <form method="POST" action="{{ route('logout') }}">
                        @csrf
                        <button type="submit" class="text-white nav-link btn btn-link">Cerrar sesión</button>
                    </form>
                </li>
            </ul>
        </nav>

        <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
                <!-- Sidebar -->
                <nav class="sb-sidenav accordion sidebar-grade" id="sidenavAccordion">
                    <div class="sb-sidenav-menu">
                        <h2 class="text-center mt-4 mb-3 title-main">Control de proyectos</h2>

                        <div class="text-center mb-3"> <!-- contenedor centrado con margen abajo -->
                            <div class="rounded-circle bg-white text-white d-flex justify-content-center align-items-center mb-3" style="width: 80px; height: 80px; margin: 0 auto;">
                                <span class="text-primary span-ab">
                                    {{ strtoupper(substr(explode(' ', Auth::user()->name)[0], 0, 1)) }}{{ strtoupper(substr(explode(' ', Auth::user()->name)[1] ?? '', 0, 1)) }}
                                </span>

                                </span>
                            </div>
                            <span class="d-block text-username">{{ Auth::user()->name }}</span>
                        </div>

                        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu">
                            <li class="nav-item">
                                <a href="{{ route('projects.index') }}" class="nav-link">
                                    <i class="nav-icon fas fa-project-diagram text-white"></i>
                                    <p class="projects">Proyectos en curso</p>
                                </a>
                                <a href="{{ route('projects.index') }}" class="nav-link">
                                    <i class="nav-icon fas fa-project-diagram text-white"></i>
                                    <p class="projects">Métricas de proyecto</p>
                                </a>
                                <a href="{{ route('projects.index') }}" class="nav-link">
                                    <i class="nav-icon fas fa-project-diagram text-white"></i>
                                    <p class="builder">Constructor de proyectos</p>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            <div id="layoutSidenav_content">
                <main>
                    <div class="container-fluid px-4 bg-mine">
                        <section class="content">
                            @yield('content')
                        </section>
                    </div>
                </main>
                <footer class="py-4 bg-light mt-auto">
                    <div class="container-fluid px-4">
                        <div class="d-flex align-items-center justify-content-between small">
                            <div class="text-muted">Copyright &copy; Your Website 2023</div>
                            <div>

                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>

        <!-- Scripts -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
        <script src="js/scripts.js"></script>
</body>

@stack('scripts') <!-- Aquí se agregará el contenido de los scripts de cada vista -->
</html>
