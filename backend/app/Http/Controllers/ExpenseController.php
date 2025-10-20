<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use App\Services\ExpenseService;
use Illuminate\Http\Request;
use App\Http\Requests\ExpenseRequest;


class ExpenseController extends Controller
{

    public function __construct(private ExpenseService $expenseService) {
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
    public function store(ExpenseRequest $request)
    {
        $validated = $request->validated();

        $result = $this->expenseService->Create($validated);

        return response($result->message, $result->status_code);  
    }

    /**
     * Display the specified resource.
     */
    public function show(Expense $expense)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ExpenseRequest $request)
    {
        $validated = $request->validated();

        $result = $this->expenseService->update($validated);

        return response($result->message, $result->status_code);  
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $result = $this->expenseService->delete($id);

        return response($result->message, $result->status_code);
    }
}
