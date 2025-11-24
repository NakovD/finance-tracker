<?php

namespace App\Services;
use App\Models\MonthlyFinance;
use App\Results\DataResult;
use App\Results\MessageResult;


class MonthlyFinanceService
{
    public function GetAllByUserId(string $userId): DataResult
    {
        $finances = MonthlyFinance::where('user_id', $userId)->get();

        return new DataResult($finances, "Finances retrieved", true, 200);
    }
    public function Create(array $data): DataResult
    {
        $created = MonthlyFinance::create($data);

        return new DataResult($created, "Finance created", true, 201);
    }

    public function Update(array $data): DataResult
    {
        $finance = MonthlyFinance::where("id", $data["id"])
            ->first();

        if (!$finance) {
            return new DataResult(null,"Finance not found", false, 404);
        }

        $finance->update($data);

        $finance->refresh();

        return new DataResult($finance, "Finance updated", true, 200);
    }
    public function Delete(int $financeId): MessageResult
    {
        $finance = MonthlyFinance::where("id", $financeId)
            ->first();

        if (!$finance) {
            return new MessageResult("Finance not found", false, 404);
        }

        $finance->delete();

        return new MessageResult("Finance deleted", true, 204);

    }
   
}
