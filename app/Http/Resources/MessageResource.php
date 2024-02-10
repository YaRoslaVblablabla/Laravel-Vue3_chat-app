<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "created_at" => $this->created_at,
            "text" => $this->text,
            "img" => $this->img,
            "user_id" => $this->user_id,
        ]; 
    }
}
