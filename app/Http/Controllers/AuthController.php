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
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\ExpiredException;

class AuthController extends Controller {
    private $valid_refresh_token;
    public function login() {
        return Inertia::render('Auth/login', [
            'title' => "Login Page"
        ]);
    }

    public function makeJwt($user) {
        // Payload untuk JWT
        $access_payload = [
            'id'       => $user['id'],
            'username' => $user['username'],
            'iat'      => time(),
            'exp'      => time() + 60 * 60 * 24
        ];
        $refresh_payload = [
            'id'       => $user['id'],
            'username' => $user['username'],
            'iat'      => time(),
            'exp'      => $this->valid_refresh_token
        ];
        // Membuat JWT Token
        $access_token = JWT::encode($access_payload, env('JWT_SECRET'), 'HS256');
        $refresh_token = JWT::encode($refresh_payload, env('JWT_REFRESH_SECRET'), 'HS256');

        // Enkripsi token
        $encrypted_access_token = Crypt::encryptString($access_token);
        $encrypted_refresh_token = Crypt::encryptString($refresh_token);

        // Memmbuat cookie
        $access_token_cookie = Cookie::make('credentials', $encrypted_access_token, 60 * 24, '/', null, false, true);
        $refresh_token_cookie = Cookie::make('refresh_credentials', $encrypted_refresh_token, 60 * 24, '/', null, false, true);
        return [
            'access_token'          => $encrypted_access_token,
            'refresh_token'         => $encrypted_refresh_token,
            'access_token_cookie'   => $access_token_cookie,
            'refresh_token_cookie'  => $refresh_token_cookie,
        ];
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
            $input = $validator->validated();
            $user = Users::where('username', $input['username'])->first();
            if(empty($user)) {
                return response()->
                    json([
                        'status'    => 403,
                        'message'   => "Username or password is wrong"
                ], 403);
            }
            if(!Hash::check($input['password'], $user['password'])) {
                return response()->json([
                    'status'    => 403,
                    'message'   => "Username or password is wrong"
                ], 403);
            }

            $token = $this->makeJwt($user);
            if($user['is_active'] == 0) {
                return response()->json([
                    'status'    => 200,
                    'message'   => 'User is not active. Please contact your administrator'
                ]);
            }
            return response()->json([
                'status'        => 200,
                'message'       => 'Login Succesfully',
                'token'     => [
                    'access'    => $token['access_token'],
                    'refresh'   => $token['refresh_token']
                ]
            ])
            ->withCookie($token['access_token_cookie'])
            ->withCookie($token['refresh_token_cookie'])
            ;
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