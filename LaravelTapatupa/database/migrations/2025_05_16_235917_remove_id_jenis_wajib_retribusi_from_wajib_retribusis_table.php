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
        Schema::table('wajib_retribusi', function (Blueprint $table) {
            // Pastikan foreign key sudah ada sebelumnya
            $table->dropForeign(['idJenisWajibRetribusi']);
            $table->dropColumn('idJenisWajibRetribusi');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('wajib_retribusis', function (Blueprint $table) {
            // Menambahkan kembali kolom dan foreign key jika rollback
            $table->unsignedBigInteger('idJenisWajibRetribusi')->nullable();
            $table->foreign('idJenisWajibRetribusi')->references('id')->on('jenis_wajib_retribusi');
        });
    }
};
