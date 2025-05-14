<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJenisStatusTable extends Migration
{
    public function up(): void
    {
        Schema::create('jenis_status', function (Blueprint $table) {
            $table->id('idJenisStatus');
            $table->string('jenisStatus');
            $table->text('keterangan')->nullable();
            $table->boolean('isDeleted')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('jenis_status');
    }
}
