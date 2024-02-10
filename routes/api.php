<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\MessageController;

Route::group([  'middleware' => 'api', 'prefix' => 'auth' ], function ($router) {

    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('me', [AuthController::class, 'me']);
    Route::post('reg', [AuthController::class, 'store']);

    Route::get('/users', [UserController::class, 'index']);
    Route::get('/users/{user}', [UserController::class, 'show']);
    Route::post('/rooms-list', [RoomController::class, 'index']);
    Route::post('/rooms', [RoomController::class, 'store']);
    
    Route::group([ 'prefix' => 'messages' ], function () {
        Route::post('/', [MessageController::class, 'store']);
        Route::post('/list', [MessageController::class, 'index']);
        Route::delete('/{message}', [MessageController::class, 'delete']);
        Route::post('/{message}', [MessageController::class, 'update']);
    });
});


