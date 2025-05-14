<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePermohonanSewaTable extends Migration
{
    public function up(): void
    {
        Schema::create('permohonan_sewa', function (Blueprint $table) {
            $table->id('idPermohonanSewa');
            $table->unsignedBigInteger('idJenisPermohonan');
            $table->string('nomorSuratPermohonan');
            $table->date('tanggalPengajuan');
            $table->unsignedBigInteger('idWajibRetribusi');
            $table->unsignedBigInteger('idObjekRetribusi');
            $table->unsignedBigInteger('idJenisJangkaWaktu');
            $table->integer('lamaSewa');
            $table->unsignedBigInteger('idPeruntukanSewa');
            $table->unsignedBigInteger('idStatus');
            $table->string('createBy');
            $table->boolean('isDeleted')->default(false);
            $table->timestamps();

            $table->foreign('idJenisPermohonan')->references('idJenisPermohonan')->on('jenis_permohonan')->restrictOnDelete();
            $table->foreign('idWajibRetribusi')->references('idWajibRetribusi')->on('wajib_retribusi')->restrictOnDelete();
            $table->foreign('idObjekRetribusi')->references('idObjekRetribusi')->on('objek_retribusi')->restrictOnDelete();
            $table->foreign('idJenisJangkaWaktu')->references('idJenisJangkaWaktu')->on('jenis_jangka_waktu')->restrictOnDelete();
            $table->foreign('idPeruntukanSewa')->references('idPeruntukanSewa')->on('peruntukan_sewa')->restrictOnDelete();
            $table->foreign('idStatus')->references('idStatus')->on('status')->restrictOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('permohonan_sewa');
    }
}
