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
            $table->unsignedBigInteger('namaStatus');
            $table->text('keterangan')->nullable();
            $table->boolean('isDeleted')->default(false);
            $table->timestamps();

            $table->foreign('namaStatus')->references('idJenisStatus')->on('jenis_status')->restrictOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('status');
    }
}
