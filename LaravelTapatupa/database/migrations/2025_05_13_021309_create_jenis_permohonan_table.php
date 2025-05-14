<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJenisPermohonanTable extends Migration
{
    public function up(): void
    {
        Schema::create('jenis_permohonan', function (Blueprint $table) {
            $table->id('idJenisPermohonan');
            $table->unsignedBigInteger('parentId')->nullable();
            $table->string('jenisPermohonan');
            $table->text('keterangan')->nullable();
            $table->boolean('isDeleted')->default(false);
            $table->timestamps();

            $table->foreign('parentId')->references('idJenisPermohonan')->on('jenis_permohonan')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('jenis_permohonan');
    }
}
