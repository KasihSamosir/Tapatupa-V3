<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LokasiObjekRetribusi extends Model
{
    use HasFactory;

    protected $table = 'lokasi_objek_retribusi';
    protected $primaryKey = 'idLokasiObjekRetribusi';
    protected $fillable = ['keterangan', 'isDeleted', 'idObjekRetribusi'];
    public $timestamps = true;

    // Relasi ke Model ObjekRetribusi
    public function objekRetribusi()
    {
        return $this->belongsTo(ObjekRetribusi::class, 'idObjekRetribusi', 'idObjekRetribusi');
    }
}
