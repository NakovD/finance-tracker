<?php

namespace App\Http\Requests;

use ExpenseCategory;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreExpenseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "name" => "required|string|min:4|max:255",
            "amount" => "required|number|min:1",
            "date" => ["required", Rule::date()->afterOrEqual(today())],
            "description" => "nullable|string|min:10|max:1000",
            "category" => ["required|string", Rule::enum(ExpenseCategory::class)],
        ];
    }
}
