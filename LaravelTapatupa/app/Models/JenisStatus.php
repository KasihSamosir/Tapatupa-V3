<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class JenisStatus extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'jenis_status';
    protected $primaryKey = 'idJenisStatus';
    public $timestamps = true;

    protected $fillable = [
        'jenisStatus',
        'keterangan',
    ];

    protected $dates = ['deleted_at'];
}