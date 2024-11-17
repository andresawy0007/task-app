<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

use App\Http\Controllers\TaskController;

Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'apiLogin']);
});


Route::middleware('auth:sanctum')->apiResource('tasks', TaskController::class);

