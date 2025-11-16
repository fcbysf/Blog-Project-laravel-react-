<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
public function store(LoginRequest $request)
{
    $user = User::where('email', $request->email)->first();

    if (!Auth::attempt($request->validated())) {
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

        $token = $user->createToken('auth_token')->plainTextToken;
        
            return response()->json([
                'token' => $token,
                'token_type' => 'Bearer'
            ]);
}


    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request)
    {

        $request->user()->tokens()->delete();


        return response()->json(['status' => 'user loggedOut'])    ;
    }
}
