<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
         Schema::table('expenses', function (Blueprint $table) {
            $table->dropForeign(['montly_finance_id']);
        });

        Schema::table('expenses', function (Blueprint $table) {
            $table->renameColumn('montly_finance_id', 'monthly_finance_id');
        });

        Schema::table('expenses', function (Blueprint $table) {
            $table->foreign('monthly_finance_id')
                ->references('id')
                ->on('monthly_finances')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('expenses', function (Blueprint $table) {
            $table->dropForeign(['monthly_finance_id']);
        });

        Schema::table('expenses', function (Blueprint $table) {
            $table->renameColumn('monthly_finance_id', 'montly_finance_id');
        });

        Schema::table('expenses', function (Blueprint $table) {
            $table->foreign('montly_finance_id')
                ->references('id')
                ->on('montly_finances')
                ->onDelete('cascade');
        });
    }
};
