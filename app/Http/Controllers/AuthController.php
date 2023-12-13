<?php

namespace App\Http\Controllers;
use Inertia\Inertia;

class AuthController extends Controller {
    public function login() {
        return Inertia::render('Auth/login');
    }

    public function actionLogin() {
        return response()->json([
            'status'    => 200,
            'message'   => "Success"
        ]);
    }
}