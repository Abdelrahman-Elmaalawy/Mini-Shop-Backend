<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    // Return all cart items for the logged-in user
    public function index()
    {
        $user = Auth::user();
        $cartItems = Cart::with('product')->where('user_id', $user->id)->get();
        return response()->json($cartItems);
    }

    // Add or update a product in the user's cart
    public function store(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'nullable|integer|min:1'
        ]);

        $cartItem = Cart::updateOrCreate(
            ['user_id' => $user->id, 'product_id' => $validated['product_id']],
            ['quantity' => $validated['quantity'] ?? 1]
        );

        // To return the updated item with product data
        $cartItem->load('product');

        return response()->json(['message' => 'Product added/updated in cart', 'cart' => $cartItem]);
    }

    // Remove a product from the user's cart using product_id
    public function destroy($productId)
    {
        $user = Auth::user();
        $cartItem = Cart::where('user_id', $user->id)->where('product_id', $productId)->first();

        if (!$cartItem) {
            return response()->json(['message' => 'Item not found in cart'], 404);
        }

        $cartItem->delete();
        return response()->json(['message' => 'Item removed from cart']);
    }

    // Sync localStorage cart with user's account upon login/register
    public function sync(Request $request)
    {
        $user = Auth::user();
        $items = $request->input('items', []);
        $mergedCart = []; // To collect the final cart items for synchronization

        // 1. Sync local items to the database
        foreach ($items as $item) {
            $productId = $item['product_id'] ?? $item['id'] ?? null;
            $quantity = $item['quantity'] ?? 1;

            if (!$productId) {
                continue;
            }

            // Add or update the cart item
            $cartItem = Cart::updateOrCreate(
                ['user_id' => $user->id, 'product_id' => $productId],
                ['quantity' => $quantity]
            );
            $mergedCart[] = $cartItem;
        }

        // Note: Since this function is used for synchronization after login, the frontend
        // is expected to fetch the full cart from the server (index) afterwards to ensure the final state.
        return response()->json(['message' => 'Cart synchronized successfully']);
    }
}
