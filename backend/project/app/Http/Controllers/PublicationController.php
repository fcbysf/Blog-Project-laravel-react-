<?php

namespace App\Http\Controllers;

use App\Http\Requests\PubliactionRequest;
use App\Models\Publication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PublicationController extends Controller
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
        return response()->json(["publications"=>Publication::with("user:id,name,image")->paginate(20),"userP"=>$request->user()->id]);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(PubliactionRequest $request)
    {
        $pub =$request->validated();
        $file = $request->file('image');
        $filename = time().'_'.$file->getClientOriginalName();
        $file->move(public_path('images'), $filename);
        $pub['image'] = url('images/' . $filename);
        $pub=  $request->user()->publication()->create($pub);
        return response()->json($pub);
    }

    /**
     * Display the specified resource.
     */
    public function show(Publication $publication)
    {
return response()->json(
    $publication->load("user:id,name,image",'comments.user:id,name,image')
);
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Publication $publication)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Publication $publication)
    {
            return response()->json(['publication id'=>$publication->user_id, "user"=>Auth::user()->id]);
    }
}
