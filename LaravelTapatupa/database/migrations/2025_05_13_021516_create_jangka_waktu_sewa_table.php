<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJangkaWaktuSewaTable extends Migration
{
    public function up(): void
    {
        Schema::create('jangka_waktu_sewa', function (Blueprint $table) {
            $table->id('idJangkaWaktuSewa');
            $table->unsignedBigInteger('idJenisJangkaWaktu');
            $table->string('jangkaWaktu');
            $table->boolean('isDefault')->default(false);
            $table->timestamps();
            $table->boolean('isDeleted')->default(false);
            $table->softDeletes(); // Pastikan baris ini ada

            $table->foreign('idJenisJangkaWaktu')->references('idJenisJangkaWaktu')->on('jenis_jangka_waktu')->restrictOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('jangka_waktu_sewa');
    }
}