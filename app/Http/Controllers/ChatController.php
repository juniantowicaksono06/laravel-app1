<?php
namespace App\Http\Controllers;
use Inertia\Inertia;
class ChatController extends Controller {
    public function chat() {
        return Inertia::render('Chat/index', [
            "title" => "Chat"
        ]);
    }
}