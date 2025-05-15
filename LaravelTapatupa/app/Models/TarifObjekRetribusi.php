<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TarifObjekRetribusi extends Model
{
    use HasFactory, SoftDeletes;

    
    protected $table = 'tarif_objek_retribusi';

    protected $primaryKey = 'idTarifObjekRetribusi';

    protected $fillable = [
        'idObjekRetribusi',
        'idJenisJangkaWaktu',
        'tanggalDinilai',
        'namaPenilai',
        'nominalTarif',
        'keterangan',
        'isDefault',
        'fileHasilPenilaian',
    ];

    protected $casts = [
        'isDefault' => 'boolean',
        'isDeleted' => 'boolean',
    ];

    
public function objekRetribusi()
{
    return $this->belongsTo(ObjekRetribusi::class, 'idObjekRetribusi');
}

public function jenisJangkaWaktu()
{
    return $this->belongsTo(JenisJangkaWaktu::class, 'idJenisJangkaWaktu');
}
}
