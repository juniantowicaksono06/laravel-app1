<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    private $currentUser;


    public function __construct() {
       
    }


    public function getUser() {
        // try {
        //     $encryptedToken = null;
        //     $useCookie = false;
        //     if(!empty(Cookie::get('credentials'))) {
        //         $encryptedToken = Cookie::get('credentials');
        //     }
        //     else {
        //         return redirect('/login');
        //     }
        //     // Decrypt to validate the token.
        //     // If it's cannot be decrypted then it's not valid
        //     $decryptedToken = Crypt::decryptString($encryptedToken);
        //     $credentials = JWT::decode($decryptedToken, new Key(env("JWT_SECRET"), env("JWT_ALGO")));
        //     return $next($request);
        // }
        //     catch(\Exception $err) {
        //         // Delete cookie if cookie is detected
        //         Cookie::queue(Cookie::forget('credentials'));
        //         return redirect('/login');
        //     }
    } 
}
