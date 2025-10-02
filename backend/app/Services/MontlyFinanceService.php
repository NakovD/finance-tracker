<?php

namespace App\Services;
use App\Models\MontlyFinance;
use App\Results\DataResult;
use App\Results\MessageResult;


class MontlyFinanceService
{
    public function GetAll(string $userId): DataResult
    {
        $finances = MontlyFinance::where('user_id', $userId)->get();

        return new DataResult($finances, "Finances retrieved", true, 200);
    }
    public function Create(array $data): DataResult
    {
        $created = MontlyFinance::create($data);

        return new DataResult($created, "Finance created", true, 201);
    }

    public function Update(array $data): DataResult
    {
        $finance = MontlyFinance::where("id", $data["id"])
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
        $finance = MontlyFinance::where("id", $financeId)
            ->first();

        if (!$finance) {
            return new MessageResult("Finance not found", false, 404);
        }

        $finance->delete();

        return new MessageResult("Finance deleted", true, 204);

    }
   
}
