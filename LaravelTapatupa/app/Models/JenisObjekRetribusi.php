<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JenisObjekRetribusi extends Model
{
    use HasFactory;

    protected $table = 'jenis_objek_retribusi'; 
    protected $primaryKey = 'idJenisObjekRetribusi'; 
    public $timestamps = true; 
    protected $fillable = ['jenisObjekRetribusi', 'keterangan']; 
    protected $guarded = ['idJenisObjekRetribusi', 'isDeleted', 'created_at', 'updated_at']; 

}