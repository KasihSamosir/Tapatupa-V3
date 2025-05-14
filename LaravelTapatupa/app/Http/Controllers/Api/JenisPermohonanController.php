<?php

namespace App\Http\Controllers\Api;

use App\Models\JenisPermohonan;
use Illuminate\Http\Request;

class JenisPermohonanController extends \App\Http\Controllers\Controller
{
    public function index()
    {
        return response()->json(JenisPermohonan::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'jenisPermohonan' => 'required|string|max:255',
            'keterangan' => 'nullable|string',
            'parentId' => 'nullable|exists:jenis_permohonan,idJenisPermohonan',
        ]);

        $jenisPermohonan = JenisPermohonan::create($request->all());

        return response()->json($jenisPermohonan, 201);
    }

    public function show(JenisPermohonan $jenisPermohonan)
    {
        return response()->json($jenisPermohonan);
    }

    public function update(Request $request, JenisPermohonan $jenisPermohonan)
    {
        $request->validate([
            'jenisPermohonan' => 'required|string|max:255',
            'keterangan' => 'nullable|string',
            'parentId' => 'nullable|exists:jenis_permohonan,idJenisPermohonan',
        ]);

        $jenisPermohonan->update($request->all());

        return response()->json($jenisPermohonan);
    }

    public function destroy(JenisPermohonan $jenisPermohonan)
    {
        try {
            $jenisPermohonan->delete(); // Jika Anda ingin hard delete
            // Jika Anda menggunakan soft delete (mengubah isDeleted menjadi true):
            // $jenisPermohonan->isDeleted = true;
            // $jenisPermohonan->save();

            return response()->json(['message' => 'Jenis permohonan berhasil dihapus'], 200);
        } catch (\Exception $e) {
            Log::error('Gagal menghapus jenis permohonan:', [$e->getMessage()]);
            return response()->json(['message' => 'Gagal menghapus jenis permohonan'], 500);
        }
    }
}
