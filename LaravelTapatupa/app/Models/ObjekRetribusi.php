<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Log;

class ObjekRetribusi extends Model
{
    use HasFactory;

    protected $table = 'objek_retribusi';
    protected $primaryKey = 'idObjekRetribusi';
    public $timestamps = true;
    protected $fillable = [
        'idJenisLokasiObjekRetribusi',
        'idJenisObjekRetribusi',
        'kodeObjekRetribusi',
        'noBangunan',
        'jumlahLantai',
        'objekRetribusi',
        'panjangTanah',
        'lebarTanah',
        'luasTanah',
        'panjangBangunan',
        'lebarBangunan',
        'luasBangunan',
        'alamat',
        'latitute',
        'longitudee',
        'keterangan',
        'gambarDenahTanah',
        'isDeleted',
    ];
    protected $casts = [
        'isDeleted' => 'boolean',
    ];

    /**
     * Get the jenisObjekRetribusi that owns the ObjekRetribusi
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function jenisObjekRetribusi(): BelongsTo
    {
        return $this->belongsTo(JenisObjekRetribusi::class, 'idJenisObjekRetribusi', 'idJenisObjekRetribusi');
    }

    /**
     * Get the lokasiObjekRetribusi that owns the ObjekRetribusi
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function lokasiObjekRetribusi(): BelongsTo
    {
        return $this->belongsTo(LokasiObjekRetribusi::class, 'idJenisLokasiObjekRetribusi', 'idLokasiObjekRetribusi');
    }
}