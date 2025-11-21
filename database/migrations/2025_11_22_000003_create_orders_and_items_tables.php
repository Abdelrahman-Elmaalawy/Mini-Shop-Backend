<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Create Parent Table (Orders) FIRST
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->decimal('total', 10, 2);
            $table->string('status')->default('Pending');
            $table->json('customer_details'); // Fixes the missing column issue
            $table->timestamps();
        });

        // 2. Create Child Table (Order Items) AFTER Orders
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            
            // Now we can safely reference 'orders' because it exists
            $table->foreignId('order_id')->constrained('orders')->onDelete('cascade');
            
            $table->foreignId('product_id')->constrained('products');
            $table->string('name'); // Fixes the missing name column issue
            $table->decimal('price', 10, 2);
            $table->integer('quantity');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        // Drop in reverse order (Child then Parent)
        Schema::dropIfExists('order_items');
        Schema::dropIfExists('orders');
    }
};