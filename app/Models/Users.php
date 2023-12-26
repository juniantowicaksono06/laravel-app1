<?php

namespace App\Models;


use MongoDB\Laravel\Eloquent\Model;

use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
// use Illuminate\Foundation\Auth\User as Authenticatable;
use MongoDB\Laravel\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Sanctum\HasApiTokens as SanctumHasApiTokens;

// class Users extends Model
// {
//     protected $connection = 'mongodb';
//     protected $table = "users";
// }

class Users extends Authenticatable implements JWTSubject {
    // use HasApiTokens;
    use HasFactory, SanctumHasApiTokens;
    protected $connection = 'mongodb';
    protected $table = "users";
    
    public function getJWTIdentifier()
    {
      return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
      return [
        'email'     => $this->email,
        'username'  => $this->username
      ];
    }
}