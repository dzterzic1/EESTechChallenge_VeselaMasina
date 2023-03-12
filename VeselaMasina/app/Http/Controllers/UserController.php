<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use Illuminate\Contracts\Cache\Store;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;


class UserController extends Controller
{
    
    public function index() : Response {
        $users = User::all();
        return response($users, 200);
    }


    
    public function store(Request $request) : Response {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string',
            'password' => 'required|string',
        ]);

        $user = new User;
        $user->name = $request['name'];
        $user->email = $request['email'];
        $user->password = Hash::make($request['password']);
        $user->streak = 0;
        $user->save();

        return response($user, 201);
    }

    public function show(User $user) : Response {
        return response($user, 200);
    }

    public function update(Request $request, User $user) : Response {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string',
            'password' => 'required|string',
            'streak' => 'required|integer'
        ]);

        $user->name = $request['name'];
        $user->email = $request['email'];
        $user->password = Hash::make($request['password']);
        $user->streak = $request['streak'];
        $user->save();

        return response($user, 200);
    }

    public function destroy(User $user) : Response {
        $user->delete();
        return response($user, 204);
    }

    public function score(User $user) : int {
        
        $levels = $user.levels();
        $score = 0;
        foreach($user->levels as $level){
            $score+= $level->pivot->best_score;
        }
        $users = User::all();
        $score2 = 0;
        $score3 = 0;

        foreach($users[1]->levels as $level){
            $score2+= $level->pivot->best_score;
        }
        foreach($users[2]->levels as $level){
            $score3+= $level->pivot->best_score;
        }

        $place = 3;
        if(score<=score2){
            $place=$place-1;
        }
        if(score<=score3){
            $place=$place-1;
        }
        return response($place, 200);
    }

}
