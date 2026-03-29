<?php

use App\Http\Controllers\ExpenseController;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MonthlyFinanceController;

Route::get('/user', function (Request $request) {
    return new UserResource($request->user());
})->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('expenses', ExpenseController::class);
});

Route::get(
    'monthlyFinances/meta/available-years',
    [MonthlyFinanceController::class, 'getAvailableYears']
);

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('monthlyFinances', MonthlyFinanceController::class);
});

