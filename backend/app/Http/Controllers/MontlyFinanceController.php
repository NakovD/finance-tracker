<?php

namespace App\Http\Controllers;

use App\Http\Requests\MontlyFinanceRequest;
use App\Models\MontlyFinance;
use App\Services\MontlyFinanceService;
use Illuminate\Http\Request;

class MontlyFinanceController extends Controller
{

    public function __construct(private MontlyFinanceService $montlyFinanceService) {
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
    public function store(MontlyFinanceRequest $request)
    {
        $validated = $request->validated();

        $result = $this->montlyFinanceService->Create($validated);

        return response($result->data, $result->status_code);  
    }

    /**
     * Display the specified resource.
     */
    public function show(MontlyFinance $montlyFinance)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(MontlyFinanceRequest $request)
    {
        $validated = $request->validated();

        $result = $this->montlyFinanceService->Update($validated);

        return response($result->data, $result->status_code);  
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MontlyFinance $montlyFinance)
    {
        //
    }
}
