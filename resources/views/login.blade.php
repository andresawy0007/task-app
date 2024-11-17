@extends('templates/html')
@section('custom_body_style', 'display: flex;')
@section('title', 'Page Title')

@section('content')
    <div class="login-container">
        <form class="login-form" action="{{ route('post-login') }}" method="POST">
            @csrf
            <h2>Login</h2>
            <input type="text" placeholder="E-mail" id="email" name="email" required>
            @if ($errors->has('email'))
                <span class="text-danger">{{ $errors->first('email') }}</span>
            @endif
            
            <input type="password" placeholder="Password" id="password" name="password" required>
            @if ($errors->has('password'))
                <span class="text-danger">{{ $errors->first('password') }}</span>
            @endif
            

            @if (session('error'))
                <div class="alert alert-danger">
                    {{ session('error') }}
                </div>
            @endif

            <button type="submit">Login</button>
        </form>
    </div>
@endsection
    