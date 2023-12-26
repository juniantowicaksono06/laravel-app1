<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class AppLogs extends Model
{
    protected $connection = 'mongodb';
    protected $table = "app_logs";
    protected $fillable = [
      'path', 'response_status_code', 'response', 'client_ip', 'accessed_date'
    ];
    public $timestamps = false;
}
