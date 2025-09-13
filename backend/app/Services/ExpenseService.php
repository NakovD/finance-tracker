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

    public function Update(array $data): MessageResult
    {
        $expense = Expense::where("id", $data["id"])
            ->first();

        if (!$expense) {
            return new MessageResult("Expense not found", false, 404);
        }

        $expense->update($data);

        return new MessageResult("Expense updated", true, 200);
    }

    public function Delete(int $expenseId): MessageResult
    {
        $expense = Expense::where("id", $expenseId)
            ->first();

        if (!$expense) {
            return new MessageResult("Expense not found", false, 404);
        }

        $expense->delete();

        return new MessageResult("Expense deleted", true, 200);

    }
}
