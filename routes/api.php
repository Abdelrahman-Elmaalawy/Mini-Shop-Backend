<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\UserController;


// Authentication routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    // Current authenticated user
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

// Products routes (Public access for list/details)
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{product}', [ProductController::class, 'show']);
Route::middleware('auth:sanctum')->put('/user/{user}', [UserController::class, 'update']);
Route::middleware('auth:sanctum')->group(function () {
    // User Cart and Orders routes
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart', [CartController::class, 'store']);
    Route::delete('/cart/{id}', [CartController::class, 'destroy']);
    Route::post('/cart/sync', [CartController::class, 'sync']);
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);

    // 🔑 Admin Product Management Routes: Protected by 'admin' middleware
    // This ensures only users with is_admin=true can access these endpoints
    Route::prefix('admin')->middleware('admin')->group(function () {
        // CRUD operations for products
        Route::post('/products', [ProductController::class, 'store']); // Add new product
        Route::put('/products/{product}', [ProductController::class, 'update']); // Edit existing product
        Route::delete('/products/{product}', [ProductController::class, 'destroy']); // Delete product

        Route::get('/users', [UserController::class, 'index']);
        Route::put('/users/{user}/toggle-admin', [UserController::class, 'toggleAdmin']);
        Route::delete('/users/{user}', [UserController::class, 'destroy']);
    });
});
