<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Enums\ExpenseCategory;


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

   protected function casts(): array
    {
        return [
            'category' => ExpenseCategory::class,
        ];
    }

    public function MonthlyFinance(): BelongsTo
    {
        return $this->belongsTo(MonthlyFinance::class);
    }
}
