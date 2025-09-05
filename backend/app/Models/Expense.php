<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Expense extends Model
{
    //


    public function MontlyFinance(): HasOne
    {
        return $this->hasOne(MontlyFinance::class);
    }
}
