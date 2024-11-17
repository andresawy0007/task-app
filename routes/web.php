<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\AuthController;

Route::prefix('login')->group(function () {
    Route::get('/', [AuthController::class, 'index'])->name('login');
    Route::post('/', [AuthController::class, 'login'])->name('post-login');
    
});

Route::post('/logout', function () {
    Auth::logout();  // Cierra la sesión del usuario actual
    return redirect('/login')->with('message', 'Has cerrado sesión correctamente');
})->name('logout');

Route::get('/logout', '\App\Http\Controllers\Auth\LoginController@logout');

Route::middleware(['auth'])->group(function () {
    Route::get('/',[TaskController::class, 'viewTasks'])->name('all-tasks');
    Route::apiResource('tasks', TaskController::class);
});




