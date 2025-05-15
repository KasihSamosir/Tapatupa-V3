<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PermohonanSewa extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'permohonan_sewa';
    protected $primaryKey = 'idPermohonanSewa';
    public $timestamps = true;
    protected $fillable = [
        'idJenisPermohonan',
        'nomorSuratPermohonan',
        'tanggalPengajuan',
        'idWajibRetribusi',
        'idObjekRetribusi',
        'idJenisJangkaWaktu',
        'lamaSewa',
        'idPeruntukanSewa',
        'idStatus',
        'createBy',
        'isDeleted',
    ];
    protected $casts = [
        'tanggalPengajuan' => 'date',
        'isDeleted' => 'boolean',
    ];

    // Relasi ke JenisPermohonan
    public function jenisPermohonan()
    {
        return $this->belongsTo(JenisPermohonan::class, 'idJenisPermohonan', 'idJenisPermohonan');
    }

    // Relasi ke WajibRetribusi
    public function wajibRetribusi()
    {
        return $this->belongsTo(WajibRetribusi::class, 'idWajibRetribusi', 'idWajibRetribusi');
    }

    // Relasi ke ObjekRetribusi
    public function objekRetribusi()
    {
        return $this->belongsTo(ObjekRetribusi::class, 'idObjekRetribusi', 'idObjekRetribusi');
    }

    // Relasi ke JenisJangkaWaktu
    public function jenisJangkaWaktu()
    {
        return $this->belongsTo(JenisJangkaWaktu::class, 'idJenisJangkaWaktu', 'idJenisJangkaWaktu');
    }

    // Relasi ke PeruntukanSewa
    public function peruntukanSewa()
    {
        return $this->belongsTo(PeruntukanSewa::class, 'idPeruntukanSewa', 'idPeruntukanSewa');
    }

    // Relasi ke Status
    public function status()
    {
        return $this->belongsTo(Status::class, 'idStatus', 'idStatus');
    }
}