<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Users;
use App\Mail\SendActivationGmail;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller {
    // Function to send Activation Email to User 
    public function actionSendActivationMail(Request $request) {
        $validator = Validator::make($request->all(), [
            'email'     => 'required|email',
        ]); 
        if($validator->fails()) {
            return response()->
            json([
                'status'    => 401,
                'message'   => $validator->errors()
            ], 401);
        }
        $data = $validator->validated();
        $status = 200;
        $message = "Email sent successfully to {$data['email']}";
        $user = Users::where('email', '=', $data['email'])->first();
        if(empty($user)) {
            return response()->
            json([
                'status'    => 404,
                'message'   => "Email {$data['email']} is not found on our database"
            ], 404);
        }
        try {
            Mail::to($data['email'])->send(new SendActivationGmail($user['username']));
        } catch (\Exception $err) {
            $status = 500;
            $message = $err->getMessage();
        }
        return response()->
        json([
            'status'    => $status,
            'message'   => $message
        ], $status);
    }
}