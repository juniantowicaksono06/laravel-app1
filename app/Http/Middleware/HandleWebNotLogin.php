<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Crypt;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\SignatureInvalidException;

class HandleWebNotLogin {
    public function handle(Request $request, Closure $next) {
        try {

            $bearerToken = $request->bearerToken();
            $encryptedToken = null;
            if(!empty($request->cookie('credentials'))) {
                $encryptedToken = $request->cookie('credentials');
                $decryptedToken = Crypt::decryptString($encryptedToken);
                $credentials = JWT::decode($decryptedToken, new Key(env("JWT_SECRET"), env("JWT_ALGO")));
                return redirect('/');
            }
        }
        catch(\Exception $err) {
            Cookie::queue(Cookie::forget('credentials'));
        }
        return $next($request);
    } 
}