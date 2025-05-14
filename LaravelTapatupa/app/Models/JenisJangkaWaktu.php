<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class JenisJangkaWaktu extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'jenis_jangka_waktu';
    protected $primaryKey = 'idJenisJangkaWaktu';
    protected $fillable = [
        'jenisJangkaWaktu',
        'keterangan',
    ];
    protected $dates = ['deleted_at'];
}