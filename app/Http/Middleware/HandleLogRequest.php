<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\AppLogs;
use Exception;
use Illuminate\Support\Facades\URL;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;

class HandleLogRequest
{
    public function handle(Request $request, Closure $next)
    {
        // try  {
            $response = $next($request);
            $statusCode = $response->getStatusCode();
            $result = $response->getContent();
            $result = json_decode($result, true);
            $currentTimestamp = now();
            AppLogs::create(
                [
                    'path'                       => $request->path(),
                    'client_ip'                  => $request->getClientIp(),
                    'accessed_date'              => $currentTimestamp->format('Y-m-d H:i:s'),
                    'response'                   => $result,
                    'response_status_code'       => $statusCode    
                ]
            );
            // if($statusCode == 500) {
            //     throw new Exception('');
            // }
        // }
        // catch(\Exception $err) {
        //     return response()->json([
        //         'status'    => 500,
        //         'message'   => 'Internal server error'
        //     ]);
        // }

        return $response;
    }
}