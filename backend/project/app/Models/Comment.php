<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Comment extends Model
{
    use HasApiTokens;
    protected $fillable =['comment','publication_id'];
    protected $hidden = ['updated_at'];
    public function publication(){
        return $this->belongsTo(Publication::class);
    }
    public function user(){
        return $this->belongsTo(User::class);
    }
}
