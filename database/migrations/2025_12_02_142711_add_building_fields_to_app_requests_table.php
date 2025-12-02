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
        Schema::table('app_requests', function (Blueprint $table) {
            $table->string('building_name')->nullable()->after('phone');
            $table->string('unit_number')->nullable()->after('building_name');
            $table->integer('number_of_residents')->nullable()->after('unit_number');
            $table->string('service_interest')->nullable()->after('number_of_residents');
            // Renombrar company a legacy si existe, o simplemente hacer drop
            if (Schema::hasColumn('app_requests', 'company')) {
                $table->dropColumn('company');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('app_requests', function (Blueprint $table) {
            $table->dropColumn(['building_name', 'unit_number', 'number_of_residents', 'service_interest']);
            $table->string('company')->nullable();
        });
    }
};
