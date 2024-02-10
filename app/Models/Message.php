<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Room;
use App\Models\User;

class Message extends Model
{
    use HasFactory;

    protected $guarded = false;

    public function room(){
        return $this->belongsToMany(Room::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
}
