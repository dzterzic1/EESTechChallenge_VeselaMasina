<?php


namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Contracts\Cache\Store;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{
    public function index() : Response {
        $categories = Category::all();
        return response($categories, 200);
    }

    public function store(Request $request) : Response {
        $request->validate([
            'name' => 'required|string'
        ]);

        $category = new Category;
        $category->name = $request['name'];
        $category->save();

        return response($category, 201);
    }

    public function show(Category $category) : Response {
        return response($category, 200);
    }

    public function update(Request $request, Category $category) : Response {
        $request->validate([
            'name' => 'required|string'
        ]);

        $category->name = $request['name'];
        $category->save();

        return response($category, 200);
    }

    public function destroy(Category $category) : Response {
        $category->delete();
        return response($category, 204);
    }
}
