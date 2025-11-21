<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    // Table name if it's not 'order_items'
    // protected $table = 'order_items';

    // Disable timestamps if your order_items table doesn't have them
    // public $timestamps = false;

    protected $fillable = [
        'order_id',
        'product_id',
        'quantity',
        'price',
        'name',
    ];

    /**
     * Get the order that this item belongs to.
     */
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    /**
     * Get the product associated with this order item.
     * (Useful if 'name' and 'price' are not stored on the items table)
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
