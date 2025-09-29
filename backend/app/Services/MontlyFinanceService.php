<?php

namespace App\Services;
use App\Models\MontlyFinance;
use App\Results\DataResult;


class MontlyFinanceService
{
    public function Create(array $data): DataResult
    {
        $created = MontlyFinance::create($data);

        return new DataResult($created, "Expense created", true, 201);
    }
}
