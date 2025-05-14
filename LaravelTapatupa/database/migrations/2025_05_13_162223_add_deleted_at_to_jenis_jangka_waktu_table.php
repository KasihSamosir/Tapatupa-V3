<?php

use Illuminate\Database\Migrations\Migration;
    use Illuminate\Database\Schema\Blueprint;
    use Illuminate\Support\Facades\Schema;

    class AddDeletedAtToJenisJangkaWaktuTable extends Migration
    {
        public function up(): void
        {
            Schema::table('jenis_jangka_waktu', function (Blueprint $table) {
                $table->softDeletes();
            });
        }

        public function down(): void
        {
            Schema::table('jenis_jangka_waktu', function (Blueprint $table) {
                $table->dropSoftDeletes();
            });
        }
    }
