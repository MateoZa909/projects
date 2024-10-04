@props(['proyecto'])

@push('styles')
    <link rel="stylesheet" href="{{ asset('css/tiempos.css') }}">
    <!-- SweetAlert2 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css" rel="stylesheet">
@endpush

<form id="form-tiempos" class="table-tiempos" action="{{ route('projects.store') }}" method="POST">
    @csrf
    <!-- <input type="hidden" name="proyecto" value="{{ $proyecto }}"> -->



</form>

<script src="{{ asset('js/tiempos.js') }}"></script>

<!-- SweetAlert2 JS -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

