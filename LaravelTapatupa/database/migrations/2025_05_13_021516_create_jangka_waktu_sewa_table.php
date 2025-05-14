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
            $table->string('jangkaWaktu');
            $table->text('keterangan')->nullable();
            $table->boolean('isDefault')->default(false);
            $table->timestamps();
            $table->boolean('isDeleted')->default(false);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('jangka_waktu_sewa');
    }
}
