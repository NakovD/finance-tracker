<?php

namespace App\Policies;

use App\Models\MontlyFinance;
use App\Models\User;

class MontlyFinancePolicy
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
    public function view(User $user, MontlyFinance $montlyFinance): bool
    {
        return $user->id === $montlyFinance->user_id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, MontlyFinance $montlyFinance): bool
    {
        return $user->id === $montlyFinance->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, MontlyFinance $montlyFinance): bool
    {
        return $user->id === $montlyFinance->user_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, MontlyFinance $montlyFinance): bool
    {
        return $user->id === $montlyFinance->user_id;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, MontlyFinance $montlyFinance): bool
    {
        return false;
    }
}
