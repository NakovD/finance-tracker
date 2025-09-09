<?php

namespace App\Services;
use App\Models\Expense;
use App\Results\MessageResult;


class ExpenseService
{
    public function Create(int $financeId, array $data): MessageResult
    {
        Expense::create($data);

        $data["montly_finance_id"] = $financeId;

        return new MessageResult("Expense created", true, 201);
    }
}
