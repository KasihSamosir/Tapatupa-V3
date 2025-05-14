<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJenisObjekRetribusiTable extends Migration
{
    public function up(): void
    {
        Schema::create('jenis_objek_retribusi', function (Blueprint $table) {
            $table->id('idJenisObjekRetribusi');
            $table->string('jenisObjekRetribusi');
            $table->text('keterangan')->nullable();
            $table->timestamps();
            $table->boolean('isDeleted')->default(false);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('jenis_objek_retribusi');
    }
}
