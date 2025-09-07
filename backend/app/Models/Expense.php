<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Expense extends Model
{
    //

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = ['name', 'description', 'amount', 'date', 'category'];

    public function MontlyFinance(): HasOne
    {
        return $this->hasOne(MontlyFinance::class);
    }
}
