<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $perPage = (int)($request->query('per_page', 100));
        $query = Product::orderBy('id', 'asc');

        if ($request->has('category') && !empty($request->query('category'))) {
            $query->where('category', $request->query('category'));
        }

        $products = $query->paginate($perPage);

        return response()->json($products);
    }


    public function create() {}


    public function show(Product $product)
    {
        return response()->json($product);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0.01',
            'image_url' => 'nullable|url',
            'stock' => 'required|integer|min:0',
            'category' => 'required|in:mobile,watch',
        ]);

        $product = Product::create([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']) . '-' . time(),
            'description' => $validated['description'] ?? null,
            'price' => $validated['price'],
            'image_url' => $validated['image_url'] ?? null,
            'stock' => $validated['stock'],
            'category' => $validated['category'],
        ]);

        return response()->json(['message' => 'Product created successfully', 'product' => $product], 201);
    }


    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0.01',
            'image_url' => 'nullable|url',
            'stock' => 'required|integer|min:0',
            'category' => 'required|in:mobile,watch',
        ]);


        $validated['slug'] = Str::slug($validated['name']) . '-' . time();

        $product->update($validated);

        return response()->json(['message' => 'Product updated successfully', 'product' => $product]);
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(['message' => 'Product deleted successfully']);
    }


    public function edit(Product $product) {}

    public function edite() {}
}
