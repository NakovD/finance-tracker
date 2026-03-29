<?php

namespace App\Services;
use App\Models\MonthlyFinance;
use App\Results\DataResult;
use App\Results\MessageResult;
use App\Http\Resources\MonthlyFinanceResource;
use App\Http\Resources\MonthlyFinanceDetailResource;


class MonthlyFinanceService
{
    public function GetAllByUserId(): DataResult
    {
        $finances = MonthlyFinance::where('user_id', auth()->id())->get();

        return new DataResult($finances, "Finances retrieved", true, 200);
    }
    public function Create(array $data): DataResult
    {
        $created = auth()->user()->monthlyFinances()->create($data);

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

    public function GetById(int $financeId): DataResult
    {
        $finance = MonthlyFinance::where("id", $financeId)
            ->with('expenses')
            ->first();

        if (!$finance) {
            return new DataResult(null,"Finance not found", false, 404);
        }

        return new DataResult(new MonthlyFinanceDetailResource($finance), "Finance retrieved", true, 200);
    }

    public function GetAvailableYears(): DataResult
    {
        $years = MonthlyFinance::where('user_id', auth()->id())
                    ->distinct()
                    ->orderBy('year', 'desc')
                    ->pluck('year');

        return new DataResult($years, "Available years retrieved", true, 200);
    }

    public function GetAllByUserIdAndYear(int $year): DataResult
    {
        $finances = MonthlyFinance::where('user_id', auth()->id())
                    ->where('year', $year)
                    ->get();

        return new DataResult(MonthlyFinanceResource::collection($finances), "Finances retrieved", true, 200);
    }
   
}
