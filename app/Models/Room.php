<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Message;

class Room extends Model
{
    use HasFactory;

    public function users(){
        return $this->belongsToMany(User::class, 'room_users', 'room_id', 'user_id');
    }

    public function messages(){
        return $this->hasMany(Message::class);
    }
}
