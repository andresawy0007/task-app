<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('equis');
});

Route::get('/login', function () {
    return view('templates/equis');
});
