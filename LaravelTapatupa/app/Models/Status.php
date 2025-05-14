<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Status extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'status';
    protected $primaryKey = 'idStatus';
    public $timestamps = true;

    protected $fillable = [
        'idJenisStatus',
        'namaStatus',
        'keterangan',
    ];

    protected $dates = ['deleted_at'];

    // Relasi dengan JenisStatus
    public function jenisStatus()
    {
        return $this->belongsTo(JenisStatus::class, 'idJenisStatus');
    }
}