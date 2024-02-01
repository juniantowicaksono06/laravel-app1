<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\CharacterController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });

Route::middleware(['noauth.jwt'])->group(function() {
    Route::get('/login', [AuthController::class, 'login']);
});


Route::middleware(['auth.jwt'])->group(function() {
    Route::get('/chat', [ChatController::class, 'chat']);
    Route::get('/', [HomeController::class, 'home']);
    Route::get('/logout', [AuthController::class, 'logout']);
    Route::controller(CharacterController::class)->group(function() {
        Route::get('/character/create', 'create');
    });
});


Route::get('/post/{slug}', [PostController::class, 'show']);


