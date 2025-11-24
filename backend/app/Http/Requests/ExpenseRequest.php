<?php

namespace App\Http\Requests;

use App\Models\Expense;
use App\Models\MonthlyFinance;
use ExpenseCategory;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ExpenseRequest extends FormRequest
{
    /**
     * Indicates if the validator should stop on the first rule failure.
     *
     * @var bool
     */
    protected $stopOnFirstFailure = true;
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $financeId = $this->input('monthly_finance_id');

        $finance = MonthlyFinance::find($financeId);

        if (!$finance) {
            return false;
        }

        return $this->user()->can('create', [Expense::class, $finance]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "monthly_finance_id" => "required|exists:monthly_finances,id",
            "name" => "required|string|min:4|max:255",
            "amount" => "required|number|min:1",
            "date" => ["required", Rule::date()->afterOrEqual(today())],
            "description" => "nullable|string|min:10|max:1000",
            "category" => ["required|string", Rule::enum(ExpenseCategory::class)],
        ];
    }
}
