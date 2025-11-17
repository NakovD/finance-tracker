<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\MonthlyFinance;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;



class MonthlyFinanceRequest extends FormRequest
{
    public function prepareForValidation(): void
    {
        if ($this->has('name')) {
            $this->merge([
                'name' => Str::ucfirst(Str::lower($this->name)),
            ]);
        }
    }

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $finance = $this->route('finance');

        return $finance
            ? $this->user()->can('update', $finance)
            : $this->user()->can('create', MonthlyFinance::class);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "user_id" => "required|exists:users,id",
            'month' => [
                'required',
                'string',
                Rule::in([
                    'January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December',
                ]),
            ],
            "income" => "required|number|min:1|max:25000",
        ];
    }
}
