<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Relations\BelongsToMany;


class Category extends Model
{
    use HasFactory;

    protected $guarded = []; //everything that I added is fillable (not hidden)

    public function levels(): BelongsToMany
    {
        return $this->belongsToMany(Level::class);
    }
}
