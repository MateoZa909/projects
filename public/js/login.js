// Animacion de campos de error
document.addEventListener("DOMContentLoaded", function () {
    const errorAlert = document.querySelector('.alert');

    if (errorAlert) {
        // Mostrar el alert
        errorAlert.classList.add('show');

        // Esperar 4 segundos
        setTimeout(function () {
            // Ocultar el alert
            errorAlert.classList.remove('show');

            // Esperar a que la animación de salida termine antes de eliminar
            setTimeout(function () {
                errorAlert.style.display = 'none'; // Elimina el elemento
            }, 500); // Coincide con el tiempo de la transición
        }, 4000); // 4000 milisegundos = 4 segundos
    }
});
