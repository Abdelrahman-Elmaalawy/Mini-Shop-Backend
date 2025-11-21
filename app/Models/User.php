<?php
// app/Models/User.php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    // Includes for API tokens and default features
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int,string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'is_admin', // NEW: Added for admin functionality
        'is_owner', // NEW: Added for owner functionality
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int,string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array<string,string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'is_admin' => 'boolean', // NEW: Cast 'is_admin' column to boolean
        'is_owner' => 'boolean', // NEW: Cast 'is_owner' column to boolean
        // 'password' => 'hashed'
    ];

    /**
     * NEW: Check if the user is an administrator.
     * This method is called by the AdminMiddleware.
     */
    public function isAdmin(): bool
    {
        return $this->is_owner === true || $this->is_admin === true;
    }

    /**
     * Check if the user is the super admin/owner.
     */
    public function isOwner(): bool
    {
        return $this->is_owner === true;
    }
}
