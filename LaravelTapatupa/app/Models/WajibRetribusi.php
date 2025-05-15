<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class WajibRetribusi extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'wajib_retribusi';
    protected $primaryKey = 'idWajibRetribusi';
    public $timestamps = true;
    protected $fillable = [
        'NIK',
        'namaWajibRetribusi',
        'pekerjaan',
        'alamat',
        'nomorPonsel',
        'nomorWhatsapp',
        'email',
        'fileFoto',
        'isDeleted',
    ];
    protected $casts = [
        'isDeleted' => 'boolean',
    ];

    // Jika di kemudian hari ada relasi dengan Jenis Retribusi,
    // Anda bisa menambahkan fungsi relasi di sini.
    // Contoh (jika ada kolom idJenisRetribusi):
    // public function jenisRetribusi()
    // {
    //     return $this->belongsTo(JenisRetribusi::class, 'idJenisRetribusi', 'idJenisRetribusi');
    // }
}