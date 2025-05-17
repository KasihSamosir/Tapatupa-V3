<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
    Schema::create('users', function (Blueprint $table) {
    $table->id('userId');
    $table->string('username');
    $table->string('password');
    $table->string('token')->nullable();
    $table->string('email')->unique();
    $table->text('keterangan')->nullable();
    $table->string('role')->default('user');
    $table->rememberToken();
    $table->timestamps();
    $table->boolean('isDeleted')->default(false);
});

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
