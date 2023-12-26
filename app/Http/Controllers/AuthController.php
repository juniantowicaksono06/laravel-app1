<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use App\Models\Users;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller {
    public function login() {
        return Inertia::render('Auth/login');
    }

    public function actionLogin(Request $request) {
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
        $data = $validator->validated();
        $user = Users::where('username', '=', $data['username'])->first();
        if(empty($user)) {
            return response()->json([
                'status'    => 404,
                'message'   => "User is not found!"
            ], 404);
        }

        $hash_password = $user['password'];
        if(!password_verify($data['password'], $hash_password)) {
            return response()->json([
                'status'    => 200,
                'message'   => "Username or password is wrong try again!"
            ], 200);
        }
        else if($user['is_active'] == 0) {
            return response()->json([
                'status'    => 200,
                'message'   => "User is not active. Please contact your system administrator!"
            ], 200);  
        }

        return response()->json([
            'status'    => 200,
            'message'   => "Login Success"
        ]);
    }

    public function actionLoginV2(Request $request) {
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
            // var_dump(Auth::guard('api'));exit;
            $token = Auth::guard('api')->attempt($credentials);
            if(!$token) {
                return response()->
                    json([
                        'status'    => 401,
                        'message'   => "Unauthorized"
                ], 401);
            }
            $user = Auth::user();
            // $token = Auth::login($user);
            if($user['is_active'] == 0) {
                return response()->json([
                    'status'    => 200,
                    'message'   => 'User is not active. Please contact your administrator'
                ]);
            }
            return response()->json([
                'status'        => 200,
                'message'       => 'Login Succesfully',
                'authorization' => [
                    'token' => $token,
                    'type' => 'bearer',
                ]
            ]);
        }
        catch(\Exception $err) {
            return response()->json([
                'status'    => 500,
                'message'   => 'Internal server error',
                'amessage'   => $err->getMessage(),
            ]);
        }
    }
}