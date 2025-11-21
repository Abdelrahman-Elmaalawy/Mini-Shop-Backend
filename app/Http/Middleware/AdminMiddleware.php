<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if the user is authenticated and if the user is an admin
        $user = Auth::user();
        if (Auth::check() && $user && ($user->isAdmin() || $user->isOwner())) {
            return $next($request);
        }

        // IMPORTANT: For API requests (common for SPAs like React), return a 403 JSON response.
        if ($request->expectsJson() || $request->is('api/*')) {
            return response()->json(['message' => 'Forbidden. You must be an administrator to perform this action.'], 403);
        }

        // Fallback for web requests
        return redirect('/')->with('error', 'You do not have permission to access this page.');
    }
}
