<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTarifObjekRetribusiTable extends Migration
{
    public function up(): void
    {
        Schema::create('tarif_objek_retribusi', function (Blueprint $table) {
            $table->id('idTarifObjekRetribusi');
            $table->unsignedBigInteger('idObjekRetribusi'); // Foreign key
            $table->unsignedBigInteger('idJenisJangkaWaktu'); // Foreign key
            $table->date('tanggalDinilai');
            $table->string('namaPenilai');
            $table->bigInteger('nominalTarif');
            $table->string('fileHasilPenilaian')->nullable();
            $table->text('keterangan')->nullable();
            $table->boolean('isDefault')->default(false);
            $table->boolean('isDeleted')->default(false);
            $table->timestamps();

            $table->foreign('idObjekRetribusi')->references('idObjekRetribusi')->on('objek_retribusi')->restrictOnDelete();
            $table->foreign('idJenisJangkaWaktu')->references('idJenisJangkaWaktu')->on('jenis_jangka_waktu')->restrictOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tarif_objek_retribusi');
    }
}
