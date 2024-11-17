@extends('templates/html')
@section('title', 'Page Title')

@section('content')
    <div class="login-container">
        <form class="login-form">
            <h2>Login</h2>
            <input type="text" placeholder="E-mail" id="username" name="username" required>
            
            <input type="password" placeholder="Password" id="password" name="password" required>

            <button type="submit">Login</button>
        </form>
    </div>
@endsection
    