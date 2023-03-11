<?php

namespace App\Http\Controllers;

use App\Models\Level;
use Illuminate\Contracts\Cache\Store;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;

class LevelController extends Controller
{
    public function index() : Response {
        $levels = Level::all();
        return response($levels, 200);
    }

    public function store(Request $request) : Response {
        $request->validate([
            'number_of_pairs' => 'required|integer',
            'category_id' => 'required|integer',
        ]);

        $level = new Level;
        $level->number_of_pairs = $request['number_of_pairs'];
        $level->category_id = $request['category_id'];
        $level->save();

        return response($level, 201);
    }

    public function show(Level $level) : Response {
        return response($level, 200);
    }

    public function update(Request $request, Level $level) : Response {
        $request->validate([
            'number_of_pairs' => 'required|integer',
            'category_id' => 'required|integer',
        ]);

        $level->number_of_pairs = $request['number_of_pairs'];
        $level->category_id = $request['category_id'];
        $level->save();

        return response($level, 200);
    }

    public function destroy(Level $level) : Response {
        $level->delete();
        return response($level, 204);
    }

}
