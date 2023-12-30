<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class UserCharacters extends Model {
    protected $connection = 'mongodb';
    protected $table = "user_characters";
}