<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PermohonanSewa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PermohonanSewaController extends Controller
{
    public function index()
    {
        $permohonanSewas = PermohonanSewa::with(['jenisPermohonan', 'wajibRetribusi', 'objekRetribusi', 'jenisJangkaWaktu', 'peruntukanSewa', 'status'])
            ->get();

        $formattedPermohonanSewas = $permohonanSewas->map(function ($permohonan) {
            return [
                'idPermohonanSewa' => $permohonan->idPermohonanSewa,
                'jenisPermohonan' => $permohonan->jenisPermohonan->jenisPermohonan ?? null,
                'nomorSuratPermohonan' => $permohonan->nomorSuratPermohonan,
                'tanggalPengajuan' => $permohonan->tanggalPengajuan->format('Y-m-d'),
                'namaWajibRetribusi' => $permohonan->wajibRetribusi->namaWajibRetribusi ?? null,
                'kodeObjekRetribusi' => $permohonan->objekRetribusi->kodeObjekRetribusi ?? null,
                'jenisJangkaWaktu' => $permohonan->jenisJangkaWaktu->jenisJangkaWaktu ?? null,
                'jangkaWaktu' => $permohonan->lamaSewa ?? null,
                'peruntukanSewa' => $permohonan->peruntukanSewa->peruntukanSewa ?? null,
                'namaStatus' => $permohonan->status->namaStatus ?? null,
                'createdAt' => $permohonan->created_at->format('Y-m-d H:i:s'),
                'updatedAt' => $permohonan->updated_at->format('Y-m-d H:i:s'),
                'isDeleted' => (bool) $permohonan->deleted_at, // Sesuaikan tampilan isDeleted
            ];
        });

        return response()->json(['data' => $formattedPermohonanSewas]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'idJenisPermohonan' => 'required|exists:jenis_permohonan,idJenisPermohonan',
            'nomorSuratPermohonan' => 'required|string|max:255',
            'tanggalPengajuan' => 'required|date',
            'idWajibRetribusi' => 'required|exists:wajib_retribusi,idWajibRetribusi',
            'idObjekRetribusi' => 'required|exists:objek_retribusi,idObjekRetribusi',
            'idJenisJangkaWaktu' => 'required|exists:jenis_jangka_waktu,idJenisJangkaWaktu',
            'lamaSewa' => 'required|integer|min:1',
            'idPeruntukanSewa' => 'required|exists:peruntukan_sewa,idPeruntukanSewa',
            'idStatus' => 'required|exists:status,idStatus',
            'createBy' => 'nullable|string|max:255',
            // tambahkan validasi untuk berkas permohonan jika ada
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $permohonanSewa = PermohonanSewa::create($request->all());

        return response()->json(['message' => 'Data permohonan sewa berhasil ditambahkan', 'data' => $permohonanSewa], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(PermohonanSewa $permohonanSewa)
    {
        $permohonanSewa->load(['jenisPermohonan', 'wajibRetribusi', 'objekRetribusi', 'jenisJangkaWaktu', 'peruntukanSewa', 'status']);
        return response()->json(['data' => $permohonanSewa]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PermohonanSewa $permohonanSewa)
    {
        $validator = Validator::make($request->all(), [
            'idJenisPermohonan' => 'required|exists:jenis_permohonan,idJenisPermohonan',
            'nomorSuratPermohonan' => 'required|string|max:255',
            'tanggalPengajuan' => 'required|date',
            'idWajibRetribusi' => 'required|exists:wajib_retribusi,idWajibRetribusi',
            'idObjekRetribusi' => 'required|exists:objek_retribusi,idObjekRetribusi',
            'idJenisJangkaWaktu' => 'required|exists:jenis_jangka_waktu,idJenisJangkaWaktu',
            'lamaSewa' => 'required|integer|min:1',
            'idPeruntukanSewa' => 'required|exists:peruntukan_sewa,idPeruntukanSewa',
            'idStatus' => 'required|exists:status,idStatus',
            'createBy' => 'nullable|string|max:255',
            // tambahkan validasi untuk berkas permohonan jika ada perubahan
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $permohonanSewa->update($request->all());

        return response()->json(['message' => 'Data permohonan sewa berhasil diperbarui', 'data' => $permohonanSewa]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PermohonanSewa $permohonanSewa)
    {
        $permohonanSewa->delete(); // Menggunakan soft delete bawaan Eloquent
        return response()->json(['message' => 'Data permohonan sewa berhasil dihapus']);
    }
}