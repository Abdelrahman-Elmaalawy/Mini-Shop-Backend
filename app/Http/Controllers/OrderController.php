<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Cart;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class OrderController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        // Eager load items to avoid N+1 problem
        $orders = Order::with('items')->where('user_id', $user->id)->latest()->get();
        return response()->json($orders);
    }

    public function store(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // Validate request
        $validated = $request->validate([
            'total' => 'required|numeric|min:0',
            'customer_details' => 'required|array', // Expect array, model handles casting
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric|min:0',
            'items.*.name' => 'nullable|string', // Allow name to be saved if DB column exists
        ]);

        DB::beginTransaction();

        try {
            // Create Order
            $order = Order::create([
                'user_id' => $user->id,
                'total' => $validated['total'],
                'status' => 'Pending',
                // FIX: Do not json_encode here. Model 'casts' handles serialization.
                'customer_details' => $validated['customer_details'], 
            ]);

            // Create Order Items
            foreach ($validated['items'] as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                    'name' => $item['name'] ?? 'Unknown Product', // Fallback if name missing
                ]);
            }

            // Clear User Cart
            Cart::where('user_id', $user->id)->delete();

            DB::commit();

            return response()->json([
                'message' => 'Order placed successfully',
                'order_id' => $order->id
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            // Log actual error for debugging (check storage/logs/laravel.log)
            Log::error('Order placement failed: ' . $e->getMessage());

            return response()->json([
                'message' => 'Server Error: Could not place order.',
                'error' => $e->getMessage() // Optional: Remove in production
            ], 500);
        }
    }
}