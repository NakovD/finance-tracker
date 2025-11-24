<?php

use App\Http\Controllers\ExpenseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MonthlyFinanceController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('expenses', ExpenseController::class);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('monthlyFinances', MonthlyFinanceController::class);
});

