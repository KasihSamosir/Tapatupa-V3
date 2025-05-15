<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWajibRetribusiTable extends Migration
{
    public function up(): void
    {
        Schema::create('wajib_retribusi', function (Blueprint $table) {
            $table->id('idWajibRetribusi');
            $table->string('NIK')->unique();
            $table->string('email')->unique();
            $table->string('nomorWhatsapp')->nullable();
            $table->string('nomorPonsel')->nullable();
            $table->string('namaWajibRetribusi');
            $table->text('alamat');
            $table->string('fileFoto')->nullable();
            $table->string('pekerjaan')->nullable();
            $table->boolean('isDeleted')->default(false);
            $table->timestamps();
            $table->softDeletes();

        });
    }

    public function down(): void
    {
        Schema::dropIfExists('wajib_retribusi');
    }
}
