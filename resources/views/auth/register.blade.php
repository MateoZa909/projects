@section('title', 'Registro')

<div class="content-title">
    <h1>Registro</h1>
</div>

<x-guest-layout class="div-content">
    <form method="POST" action="{{ route('register') }}">
        @csrf

        <!-- Name -->
        <div>
            <label for="name">{{ __('Name') }}</label>
            <input id="name" class="block mt-1 w-full" type="text" name="name" value="{{ old('name') }}" required autofocus autocomplete="name" />
            @if ($errors->get('name'))
                <div class="text-red-500 text-sm mt-2">
                    {{ implode(', ', $errors->get('name')) }}
                </div>
            @endif
        </div>

        <!-- Email Address -->
        <div class="mt-4">
            <label for="email">{{ __('Email') }}</label>
            <input id="email" class="block mt-1 w-full" type="email" name="email" value="{{ old('email') }}" required autocomplete="username" />
            @if ($errors->get('email'))
                <div class="text-red-500 text-sm mt-2">
                    {{ implode(', ', $errors->get('email')) }}
                </div>
            @endif
        </div>

        <!-- Password -->
        <div class="mt-4">
            <label for="password">{{ __('Password') }}</label>
            <input id="password" class="block mt-1 w-full" type="password" name="password" required autocomplete="new-password" />
            @if ($errors->get('password'))
                <div class="text-red-500 text-sm mt-2">
                    {{ implode(', ', $errors->get('password')) }}
                </div>
            @endif
        </div>

        <!-- Confirm Password -->
        <div class="mt-4">
            <label for="password_confirmation">{{ __('Confirm Password') }}</label>
            <input id="password_confirmation" class="block mt-1 w-full" type="password" name="password_confirmation" required autocomplete="new-password" />
            @if ($errors->get('password_confirmation'))
                <div class="text-red-500 text-sm mt-2">
                    {{ implode(', ', $errors->get('password_confirmation')) }}
                </div>
            @endif
        </div>

        <div class="flex items-center justify-end mt-4">
            <a class="already-exist" href="{{ route('login') }}">
                {{ __('Already registered?') }}
            </a>

            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded ml-4">
                {{ __('Register') }}
            </button>
        </div>
    </form>
</x-guest-layout>
