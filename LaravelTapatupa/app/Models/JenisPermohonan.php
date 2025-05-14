<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JenisPermohonan extends Model
{
    protected $table = 'jenis_permohonan'; // Secara eksplisit memberitahu nama tabel
    protected $primaryKey = 'idJenisPermohonan'; // Secara eksplisit memberitahu nama primary key
    public $timestamps = true; // Jika tabel Anda memiliki kolom created_at dan updated_at
    protected $fillable = ['jenisPermohonan', 'keterangan', 'parentId']; // Kolom yang boleh diisi mass assignment
    // protected $guarded = ['idJenisPermohonan']; // Kolom yang tidak boleh diisi mass assignment (opsional)

    // Jika Anda ingin mendefinisikan relasi parent-child (hierarki):
    public function parent()
    {
        return $this->belongsTo(JenisPermohonan::class, 'parentId', 'idJenisPermohonan');
    }

    public function children()
    {
        return $this->hasMany(JenisPermohonan::class, 'parentId', 'idJenisPermohonan');
    }
}