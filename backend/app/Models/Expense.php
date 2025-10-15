<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;


class Expense extends Model
{
    use SoftDeletes;

    //

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = ['name', 'description', 'amount', 'date', 'category'];

    public function MontlyFinance(): BelongsTo
    {
        return $this->belongsTo(MontlyFinance::class);
    }
}
