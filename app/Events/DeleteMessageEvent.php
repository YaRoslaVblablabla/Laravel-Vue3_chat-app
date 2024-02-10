<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class DeleteMessageEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    private $id;

    public function __construct($id)
    {
        $this->id = $id;
    }

    public function broadcastOn()
    {
        return [
            new Channel('delete-message'),
        ];
    }

    public function broadcastAs()
    {
        return 'delete-message';
    }

    public function broadcastWith()
    {
        return [
            'id' =>$this->id
        ];
    }
}
