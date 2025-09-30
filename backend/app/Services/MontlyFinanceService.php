<?php

namespace App\Services;
use App\Models\MontlyFinance;
use App\Results\DataResult;


class MontlyFinanceService
{
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
 
   
}
