<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

use App\Models\Message;
use App\Models\User;

use App\Http\Resources\MessageResource;
use App\Http\Resources\RoomResource;
use App\Http\Resource\MessageUpdateResource;

use App\Http\Requests\TwoUsersRequest;
use App\Http\Requests\MessageRequest;

use App\Events\SendMessageEvent;
use App\Events\DeleteMessageEvent;

class MessageController extends Controller
{
    public function index(TwoUsersRequest $request){
        $data = $request->validated();
        $rooms_user1 = User::find($data['user_1'])->rooms;
        $rooms_user2 = User::find($data['user_2'])->rooms;
        $result = $rooms_user1->intersect( $rooms_user2 );
        return empty($result[0]) ? [null, null] : [ new RoomResource($result[0]),$result[0]->messages ];
    }

    public function store(MessageRequest $request){
        
        $data = $request->validated();
        $data['img'] = Storage::put('public/img', $data['img']);
        $data['img'] = mb_substr($data['img'], 6, mb_strlen($data['img']));
        $message = Message::create($data);
        
        broadcast(new SendMessageEvent($message))->toOthers();
        return $message;

    }

    public function update(Request $request, Message $message){
        $data = $request->validate([
            'text' => 'string',
            'img' => 'file',
        ]);

        if($data['img'] == 'null'){
            unset($data['img']);
        } else {
            $data['img'] = Storage::put('public/img', $data['img']);
            $data['img'] = mb_substr($data['img'], 6, mb_strlen($data['img']));
        }

        $message->update($data);
        broadcast(new SendMessageEvent($message))->toOthers();
        
        return $message;
    }

    public function delete(Message $message){

        $id = $message->id;
        $messages = Message::where('answer', '=', $id)->get();
        Storage::delete('public'.$message['img']);
        foreach($messages as $mess){
            $mess->update( [ 'answer' => null ] );
        }

        broadcast(new DeleteMessageEvent($id))->toOthers();
        $message->delete();
        return $id;
    }
}
