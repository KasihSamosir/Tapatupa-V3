<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJenisJangkaWaktuTable extends Migration
{
    public function up(): void
    {
        Schema::create('jenis_jangka_waktu', function (Blueprint $table) {
            $table->id('idJenisJangkaWaktu');
            $table->string('jenisJangkaWaktu');
            $table->text('keterangan')->nullable();
            $table->timestamps();
            $table->boolean('isDeleted')->default(false);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('jenis_jangka_waktu');
    }
}
