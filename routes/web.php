<?php

use Illuminate\Support\Facades\Route;


Route::get('/tasks', function () {
    return view('tasks');
});
Route::get('/login', function () {
    return view('login');
});
