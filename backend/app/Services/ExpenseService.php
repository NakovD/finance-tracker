<?php

namespace App\Services;
use App\Models\Expense;
use App\Results\DataResult;
use App\Results\MessageResult;


class ExpenseService
{
    public function Create(array $data): DataResult
    {
        $created = Expense::create($data);

        return new DataResult($created, "Expense created", true, 201);
    }

    public function Update(array $data): DataResult
    {
        $expense = Expense::where("id", $data["id"])
            ->first();

        if (!$expense) {
            return new DataResult(null, "Expense not found", false, 404);
        }

        $expense->update($data);

        $expense->refresh();

        return new DataResult($expense, "Expense updated", true, 200);
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
