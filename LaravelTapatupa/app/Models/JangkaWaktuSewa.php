<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class JangkaWaktuSewa extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'jangka_waktu_sewa';
    protected $primaryKey = 'idJangkaWaktuSewa';
    public $timestamps = true;

    protected $fillable = [
        'idJenisJangkaWaktu',
        'jangkaWaktu',
        'isDefault',
    ];

    protected $dates = ['deleted_at'];

    // Relasi dengan model JenisJangkaWaktu
    public function jenisJangkaWaktu()
    {
        return $this->belongsTo(JenisJangkaWaktu::class, 'idJenisJangkaWaktu', 'idJenisJangkaWaktu');
    }
}