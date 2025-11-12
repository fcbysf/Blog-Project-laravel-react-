<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\PublicationController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request ;
use Illuminate\Support\Facades\Route;


Route::middleware("auth:sanctum")->get('/user',function(Request $request){
return response()->json($request->user()->id);
});
Route::apiResource('user', UserController::class);
Route::apiResource('publication', PublicationController::class);
Route::apiResource('comment', CommentController::class);