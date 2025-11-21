<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class UserController extends Controller
{
    /**
     * Get all users (Admin/Owner only).
     */
    public function index()
    {
        // Permission check: Only Admin OR Owner can view the list
        if (!Auth::user()->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // IMPORTANT: Ensure 'is_owner' is included in the select statement
        return response()->json(User::all(['id', 'name', 'email', 'is_admin', 'is_owner']));
    }

    /**
     * Toggle the is_admin status for a user.
     */
    public function toggleAdmin(User $user)
    {
        $currentUser = Auth::user();

        if (!$currentUser->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if (!$currentUser->isOwner() && ($user->isOwner() || $user->is_admin)) {
            return response()->json(['message' => 'Only the Owner can modify admin or owner accounts.'], 403);
        }

        if ($user->id === $currentUser->id) {
            return response()->json(['message' => 'Cannot modify your own status.'], 403);
        }

        $user->is_admin = !$user->is_admin;
        $user->save();

        return response()->json(['message' => 'User admin status toggled successfully.']);
    }


    public function update(Request $request, User $user)
    {
        // Ensure the current user is editing their own profile
        if ($request->user()->id !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users,email,'.$user->id,
        ]);

        $user->update($validated);

        return response()->json($user);
    }
    /**
     * Delete a user.
     */
    public function destroy(User $user)
    {
        // 🔑 Permission Check: Only Admin OR Owner can perform this action.
        if (!Auth::user()->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // 🛑 NEW LOGIC: Prevent non-Owner Admins from deleting Admin/Owner accounts.
        // If the authenticated user is NOT the owner, they cannot delete the target user if the target is an admin OR an owner.
        if (!Auth::user()->isOwner() && ($user->isOwner() || $user->is_admin)) {
            return response()->json(['message' => 'Only the Owner can delete admin or owner accounts.'], 403);
        }

        // 🛑 Prevent the user from deleting their own account (for safety).
        if ($user->id === Auth::id()) {
            return response()->json(['message' => 'You cannot delete your own account.'], 403);
        }

        $user->delete();

        return response()->json(['message' => 'User deleted successfully.']);
    }
}
