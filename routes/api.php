<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MailController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


// Route::post('/login', [AuthController::class, 'actionLogin']);
Route::controller(AuthController::class)->group(function() {
    Route::post('login', 'actionLogin');
    Route::get('get_hash', 'hash');
});

Route::post('/send-activation', [MailController::class, 'actionSendActivationMail']);