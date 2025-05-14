<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePeruntukanSewaTable extends Migration
{
    public function up(): void
    {
        Schema::create('peruntukan_sewa', function (Blueprint $table) {
            $table->id('idPeruntukanSewa');
            $table->string('jenisKegiatan');
            $table->string('peruntukanSewa');
            $table->text('keterangan')->nullable();
            $table->timestamps();
            $table->boolean('isDeleted')->default(false);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('peruntukan_sewa');
    }
}
