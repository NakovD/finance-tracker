<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;


class MonthlyFinance extends Model
{
    use SoftDeletes;
    //

    public function expenses(): HasMany
    {
        return $this->hasMany(Expense::class);
    }
}
