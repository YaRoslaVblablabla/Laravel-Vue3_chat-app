<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('room_users', function (Blueprint $table) {
            $table->id();
            
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('room_id');

            $table->index('user_id', 'room_user_user_idx');
            $table->index('room_id', 'room_user_room_idx');

            $table->foreign('user_id', 'room_user_user_fk')->on('users')->references('id');
            $table->foreign('room_id', 'room_user_room_fk')->on('rooms')->references('id');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('room_users');
    }
};
