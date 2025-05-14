<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLokasiObjekRetribusiTable extends Migration
{
    public function up(): void
    {
        Schema::create('lokasi_objek_retribusi', function (Blueprint $table) {
            $table->id('idLokasiObjekRetribusi');
            $table->text('keterangan')->nullable();
            $table->timestamps();
            $table->boolean('isDeleted')->default(false);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lokasi_objek_retribusi');
    }
}
