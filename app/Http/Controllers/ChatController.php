<?php
namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\UserCharacters;
// use MongoDB\BSON\ObjectID;
// use MongoDB\Laravel\Eloquent\Casts\ObjectId;
use MongoDB\BSON\ObjectId;


class ChatController extends Controller {
    public function chat() {
        $userCharacters = UserCharacters::where('user_id', new ObjectId('657afe24b28c50d516299d15'))
        ->raw(function ($collection) {
            return $collection->aggregate([
                [
                    '$lookup' => [
                        'from' => 'characters',
                        'localField' => 'characters',
                        'foreignField' => '_id',
                        'as' => 'selected_characters',
                    ],
                ],
            ]);
        })->first();
        return Inertia::render('Chat/index', [
            "title" => "Chat",
            "usersCharacters" => $userCharacters
        ]);
    }
}