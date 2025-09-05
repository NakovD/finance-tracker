<?php

use App\Models\MontlyFinance;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        //
        Schema::table('expenses', function (Blueprint $table) {
            $table->foreignId('montly_finance_id')->constrained('montly_finances')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::table('expenses', function (Blueprint $table) {
            $table->dropColumn('montly_finance_id');
        });
    }
};
