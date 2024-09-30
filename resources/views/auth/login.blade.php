<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="{{ asset('css/login.css') }}">
</head>
<body>
    <div class="container">
        <div class="title-logo">
            <div class="back-title">
                <h1>Control <br> de Proyectos</h1>
            </div>
            <div class="back-logo">
                <img src="{{ asset('images/logo-verytel.png') }}" alt="">
            </div>
        </div>

        <!-- Bloque de errores, estilizado y en posición prominente -->
        @if ($errors->any())
            <div class="alert alert-danger">
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <div class="usernamee">
            <form class="user-pass" method="POST" action="{{ route('login') }}">
                @csrf
                <label for="usuario">Usuario</label>
                <input type="text" id="usuario" name="email" placeholder="abello@grupoverytel.com">

                <label for="contrasena">Contraseña</label>
                <input type="password" id="contrasena" name="password" placeholder="*************">

                <!-- Botón de inicio de sesión -->
                <div class="back-btn">
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    </div>

    <script src="{{ asset('js/login.js') }}"></script>
</body>
</html>
