<?php

namespace App\Policies;

use App\Models\User;
use App\Models\publication;
use Illuminate\Auth\Access\Response;
use Illuminate\Support\Facades\Auth;

class publicationPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, publication $publication): bool
    {
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, publication $publication): bool
    {
        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, publication $publication): bool
    {
        return Auth::user()->id == $publication->user_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, publication $publication): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, publication $publication): bool
    {
        return false;
    }
}
