<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\PublicationController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request ;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

use App\Http\Controllers\Auth\RegisteredUserController;

Route::post('/register', [RegisteredUserController::class, 'store'])
    ->middleware('guest')
    ->name('register');

Route::post('/login', [AuthenticatedSessionController::class, 'store'])
    ->middleware('guest')
    ->name('login');

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth:sanctum')
    ->name('logout');



Route::middleware(["auth:sanctum"])->get('/user',function(Request $request){
return response()->json($request->user()->id);
});
Route::apiResource('user', UserController::class);
Route::apiResource('publication', PublicationController::class);
Route::apiResource('comment', CommentController::class);
Route::get('/csrf-token', function () {
    return response()->json(['token' => csrf_token()]);
});
