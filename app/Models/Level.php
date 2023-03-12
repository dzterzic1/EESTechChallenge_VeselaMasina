<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Relations\BelongsToMany;

use Illuminate\Database\Eloquent\Relations\HasOne;



class Level extends Model
{
    use HasFactory;

    protected $guarded = []; //everything that I added is fillable (not hidden)

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(Role::class, 'level_user', 'level_id', 'user_id');
    }

    public function category(): HasOne
    {
        return $this->hasOne(Category::class);
    }


}
