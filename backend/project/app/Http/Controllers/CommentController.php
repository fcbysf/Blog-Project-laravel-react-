<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Publication;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }
    public function index()
    {
        return response()->json();
    }




    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $comment = $request->validate([
            'publication_id'=>'required|exists:publications,id',
            'comment'=>'required:min:2'
        ]);
        $request->user()->comments()->create($comment);
        return response()->json('useradded');
    }

    /**
     * Display the specified resource.
     */
    public function show(Comment $comment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.

     * Update the specified resource in storage.
     */
    public function update(Request $request, Comment $comment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        $this->authorize('delete',$comment);
        $comment->delete();
        return response()->noContent();
    }
}
