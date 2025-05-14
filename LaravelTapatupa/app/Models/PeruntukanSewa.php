<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PeruntukanSewa extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'peruntukan_sewa';
    protected $primaryKey = 'idPeruntukanSewa';
    public $timestamps = true;

    protected $fillable = [
        'jenisKegiatan', // Tambahkan jenisKegiatan ke fillable
        'peruntukanSewa',
        'keterangan',
    ];

    protected $dates = ['deleted_at'];
}