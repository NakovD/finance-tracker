<?php

namespace App\Http\Controllers;

use App\Http\Requests\MonthlyFinanceRequest;
use App\Services\MonthlyFinanceService;
use Illuminate\Http\Request;

class MonthlyFinanceController extends Controller
{

    public function __construct(private MonthlyFinanceService $monthlyFinanceService) {
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $year = $request->query('year');

        if ($year) {
            $result = $this->monthlyFinanceService->GetAllByUserIdAndYear((int)$year);
        } else {
            $result = $this->monthlyFinanceService->GetAllByUserId();
        }

        return response($result->data, $result->status_code);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(MonthlyFinanceRequest $request)
    {
        $validated = $request->validated();

        $result = $this->monthlyFinanceService->Create($validated);

        return response($result->data, $result->status_code);  
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        $result = $this->monthlyFinanceService->GetById($id);

        return response($result->data, $result->status_code);
    }

    public function getAvailableYears()
    {
        $result = $this->monthlyFinanceService->GetAvailableYears();

        return response($result->data, $result->status_code);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(MonthlyFinanceRequest $request)
    {
        $validated = $request->validated();

        $result = $this->monthlyFinanceService->Update($validated);

        return response($result->data, $result->status_code);  
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $result = $this->monthlyFinanceService->Delete($id);

        return response($result->message, $result->status_code);
    }
}
