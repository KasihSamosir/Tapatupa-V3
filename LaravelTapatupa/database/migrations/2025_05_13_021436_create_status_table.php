<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStatusTable extends Migration
{
    public function up(): void
    {
        Schema::create('status', function (Blueprint $table) {
            $table->id('idStatus');
            $table->unsignedBigInteger('idJenisStatus'); // Menggunakan nama yang sesuai dengan relasi
            $table->string('namaStatus'); // Nama status yang lebih spesifik
            $table->text('keterangan')->nullable();
            $table->boolean('isDeleted')->default(false);
            $table->timestamps();
            $table->softDeletes(); // Tambahkan soft deletes

            $table->foreign('idJenisStatus')->references('idJenisStatus')->on('jenis_status')->restrictOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('status');
    }
}