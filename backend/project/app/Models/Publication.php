<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Publication extends Model
{
    use HasApiTokens,HasFactory;
    
    protected $fillable =[
        'title', 'image', 
    ];
    protected $hidden = ['updated_at'];
    public function user(){
        return $this->belongsTo(User::class);
    }
    public function comments() {
        return $this->hasMany(Comment::class);
    }
}
