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
            $table->timestamps(); // created_at dan updated_at
            $table->boolean('isDeleted')->default(false);
            $table->softDeletes(); // Untuk soft delete
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('peruntukan_sewa');
    }
}