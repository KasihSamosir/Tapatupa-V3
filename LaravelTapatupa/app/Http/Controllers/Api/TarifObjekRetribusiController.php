<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TarifObjekRetribusi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class TarifObjekRetribusiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tarifs = TarifObjekRetribusi::with(['objekRetribusi', 'jenisJangkaWaktu'])->get();
        return response()->json($tarifs);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
{
   $request->validate([
    'idObjekRetribusi' => 'required|exists:objek_retribusi,idObjekRetribusi',
    'idJenisJangkaWaktu' => 'required|exists:jenis_jangka_waktu,idJenisJangkaWaktu',
    'tanggalDinilai' => 'required|date',
    'namaPenilai' => 'required|string',
    'nominalTarif' => 'required|numeric',
    'keterangan' => 'nullable|string',
    'isDefault' => 'boolean',
    'fileHasilPenilaian' => 'nullable|file|mimes:pdf,jpg,jpeg,png',
]);

    $data = $request->all();

    if ($request->hasFile('fileHasilPenilaian')) {
        $data['fileHasilPenilaian'] = $request->file('fileHasilPenilaian')->store('file-penilaian', 'public');
    }

    $tarif = TarifObjekRetribusi::create($data);

    return response()->json(['message' => 'Data berhasil disimpan', 'data' => $tarif], 201);
}

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\TarifObjekRetribusi  $tarifObjekRetribusi
     * @return \Illuminate\Http\Response
     */
    public function show(TarifObjekRetribusi $tarifObjekRetribusi)
    {
        $tarifObjekRetribusi->load(['objekRetribusi', 'jenisJangkaWaktu']);
        return response()->json($tarifObjekRetribusi);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\TarifObjekRetribusi  $tarifObjekRetribusi
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, TarifObjekRetribusi $tarifObjekRetribusi)
    {
        $validator = Validator::make($request->all(), [
            'idObjekRetribusi' => 'required|exists:objek_retribusi,idObjekRetribusi',
            'idJenisJangkaWaktu' => 'required|exists:jenis_jangka_waktu,idJenisJangkaWaktu',
            'tanggalDinilai' => 'required|date',
            'namaPenilai' => 'required|string|max:255',
            'nominalTarif' => 'required|numeric|min:0',
            'keterangan' => 'nullable|string',
            'isDefault' => 'nullable|boolean',
            'fileHasilPenilaian' => 'nullable|file|max:2048|mimes:pdf,doc,docx,xls,xlsx', // Contoh validasi file
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->except('fileHasilPenilaian');
        $data['isDefault'] = $request->has('isDefault');

        if ($request->hasFile('fileHasilPenilaian')) {
            // Hapus file lama jika ada
            if ($tarifObjekRetribusi->fileHasilPenilaian && Storage::disk('public')->exists($tarifObjekRetribusi->fileHasilPenilaian)) {
                Storage::disk('public')->delete($tarifObjekRetribusi->fileHasilPenilaian);
            }
            $file = $request->file('fileHasilPenilaian');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('hasil_penilaian', $filename, 'public');
            $data['fileHasilPenilaian'] = $path;
        }

        $tarifObjekRetribusi->update($data);

        return response()->json($tarifObjekRetribusi);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TarifObjekRetribusi  $tarifObjekRetribusi
     * @return \Illuminate\Http\Response
     */
    public function destroy(TarifObjekRetribusi $tarifObjekRetribusi)
    {
        $tarifObjekRetribusi->delete();
        return response()->json(['message' => 'Tarif berhasil dihapus']);
    }
}