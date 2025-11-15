<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\PublicationController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request ;
use Illuminate\Support\Facades\Route;


Route::middleware(["auth:sanctum",'web'])->get('/user',function(Request $request){
return response()->json($request->user()->id);
});
Route::apiResource('user', UserController::class);
Route::apiResource('publication', PublicationController::class);
Route::apiResource('comment', CommentController::class);
Route::get('/csrf-token', function () {
    return response()->json(['token' => csrf_token()]);
});
Route::get('/test-config', function() {
    return response()->json([
        'session_same_site' => config('session.same_site'),
        'session_secure' => config('session.secure'),
        'session_driver' => config('session.driver'),
        'app_env' => config('app.env'),
    ]);
});