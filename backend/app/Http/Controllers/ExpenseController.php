<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use App\Services\ExpenseService;
use Illuminate\Http\Request;
use App\Http\Requests\StoreExpenseRequest;


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
    public function store(StoreExpenseRequest $request)
    {
        $validated = $request->validated();

        $financeId = $request->input('finance_id');

        $result = $this->expenseService->Create($financeId, $validated);

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
    public function update(Request $request, Expense $expense)
    {
        //
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
