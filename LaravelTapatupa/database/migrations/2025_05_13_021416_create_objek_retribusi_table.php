<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateObjekRetribusiTable extends Migration
{
    public function up(): void
    {
        Schema::create('objek_retribusi', function (Blueprint $table) {
            $table->id('idObjekRetribusi');
            $table->unsignedBigInteger('idJenisLokasiObjekRetribusi'); // Foreign key
            $table->unsignedBigInteger('idJenisObjekRetribusi'); // Foreign key
            $table->string('kodeObjekRetribusi');
            $table->string('noBangunan')->nullable();
            $table->integer('jumlahLantai')->nullable();
            $table->string('objekRetribusi');
            $table->decimal('panjangTanah', 10, 2)->nullable();
            $table->decimal('lebarTanah', 10, 2)->nullable();
            $table->decimal('luasTanah', 10, 2)->nullable();
            $table->decimal('panjangBangunan', 10, 2)->nullable();
            $table->decimal('lebarBangunan', 10, 2)->nullable();
            $table->decimal('luasBangunan', 10, 2)->nullable();
            $table->text('alamat');
            $table->decimal('latitute', 10, 7);
            $table->decimal('longitudee', 10, 7);
            $table->text('keterangan')->nullable();
            $table->string('gambarDenahTanah')->nullable();
            $table->timestamps();
            $table->boolean('isDeleted')->default(false);

            $table->foreign('idJenisLokasiObjekRetribusi')->references('idLokasiObjekRetribusi')->on('lokasi_objek_retribusi')->restrictOnDelete();
            $table->foreign('idJenisObjekRetribusi')->references('idJenisObjekRetribusi')->on('jenis_objek_retribusi')->restrictOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('objek_retribusi');
    }
}
