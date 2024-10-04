@props(['proyecto'])

@push('styles')
    <link rel="stylesheet" href="{{ asset('css/facturacion-table.css') }}">
    <!-- SweetAlert2 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css" rel="stylesheet">
@endpush



<script src="{{ asset('js/facturacion.js') }}"></script>

<!-- SweetAlert2 JS -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

