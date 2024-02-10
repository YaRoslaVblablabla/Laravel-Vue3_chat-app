<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Room;
use App\Http\Resources\MessageResource;
use App\Http\Resources\UserResource;
use App\Http\Requests\TwoUsersRequest;

class RoomController extends Controller
{
    public function index(Request $request){
        $data = $request->validate([ "user_id" => '' ]);

        $rooms = User::find($data["user_id"])->rooms;
        $dataForUser = [];
        foreach($rooms as $room){
            $singleData = [];

            if(count($room->messages) > 0) {
                $singleData[] = new MessageResource($room->messages[count($room->messages)-1]);
                $room->users[0]->id != $data[ "user_id"] ? $singleData[] = new UserResource($room->users[0]) : $singleData[] = new UserResource($room->users[1]);
                $dataForUser[] = $singleData;
            }

        }

        return $dataForUser;
    }

    public function store(TwoUsersRequest $request){
        $data = $request->validated();
        $room = Room::create();
        $room->users()->attach([$data['user_1'], $data['user_2']]);
        return $room;
    }
}
