<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;


class MontlyFinance extends Model
{
    //

    public function expenses(): HasMany
    {
        return $this->hasMany(Expense::class);
    }
}
