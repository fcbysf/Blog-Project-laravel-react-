<?php

namespace App\Http\Controllers;

use App\Models\user;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return response()->json($request->user()->id);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(user $user)
    {
        return response()->json(["user"=>$user->load('publication','comments.publication'),'authUser'=>Auth::id()]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, user $user)
    {
        $editedValues = $request->validate([
            'name'=>'max:255',
            'bio'=> '',
            'image' =>'image'
        ]);
        if($request->hasFile('image')){
        $file = $request->file('image');
        $filename = time().'_'.$file->getClientOriginalName();
        $file->move(public_path('images'), $filename);
        $pub['image'] = url('images/' . $filename);
        $user->update($editedValues);
        }
        else{
                $user->update($editedValues);
        }
        return response()->json('user updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(user $user)
    {
        //
    }
}
