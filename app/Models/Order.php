<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    // Enable factory support
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     * Prevents MassAssignmentException when using Order::create().
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'total',
        'status',
        'customer_details', // Customer info (JSON)
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'total' => 'float',
        'customer_details' => 'array', // Automatically cast JSON to array and vice-versa
    ];

    /**
     * Defines the relationship: An Order belongs to a User.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Defines the relationship: An Order has many OrderItems.
     * This is required by OrderController@index (Order::with('items')).
     */
    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}
