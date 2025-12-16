<?php

namespace App\Http\Controllers;

use App\Http\Requests\MonthlyFinanceRequest;
use App\Services\MonthlyFinanceService;

class MonthlyFinanceController extends Controller
{

    public function __construct(private MonthlyFinanceService $monthlyFinanceService) {
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function show(string $id)
    {
        $result = $this->monthlyFinanceService->GetAllByUserId($id);

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
