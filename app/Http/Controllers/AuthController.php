<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use App\Models\Users;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Cookie;

class AuthController extends Controller {
    public function login() {
        return Inertia::render('Auth/login', [
            'title' => "Login Page"
        ]);
    }

    public function logout() {
        Cookie::queue(Cookie::forget('credentials'));
        // Cookie::forget('credentials');
        return redirect('/login');
    }

    public function actionLogin(Request $request) {
        try {
            $validator = Validator::make($request->all(), [
                'username'  => 'required|max:60',
                'password'  => 'required'
            ]); 
            if($validator->fails()) {
                return response()->
                json([
                    'status'    => 401,
                    'message'   => $validator->errors()
                ], 401);
            }
            $credentials = $request->only('username', 'password');
            $token = Auth::guard('api')->attempt($credentials);
            if(!$token) {
                return response()->
                    json([
                        'status'    => 401,
                        'message'   => "Unauthorized"
                ], 401);
            }
            $user = Auth::guard('api')->user();
            // $token = Auth::login($user);
            if($user['is_active'] == 0) {
                return response()->json([
                    'status'    => 200,
                    'message'   => 'User is not active. Please contact your administrator'
                ]);
            }
            $encrypted_token = Crypt::encryptString($token);
            // $encrypted_token = encrypt($token);
            $cookie = Cookie::make('credentials', $encrypted_token, 60 * 24, '/', null, false, true);
            return response()->json([
                'status'        => 200,
                'message'       => 'Login Succesfully',
                'authorization' => [
                    'token' => $token,
                    'type' => 'bearer',
                ]
            ])->withCookie($cookie);
        }
        catch(\Exception $err) {
            return response()->json([
                'status'    => 500,
                'message'   => 'Internal server error',
                'amessage'   => $err->getMessage(),
            ]);
        }
    }

    public function hash() {
        return response()->json([
            'status'    => 200,
            'message'   => Hash::make("Abcd1234"),
        ]);
    }
}