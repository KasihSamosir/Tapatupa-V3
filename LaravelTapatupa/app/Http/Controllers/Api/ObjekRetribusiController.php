<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ObjekRetribusi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log; // Pindahkan baris ini ke sini

class ObjekRetribusiController extends Controller
{
    public function index()
    {
        $objekRetribusis = ObjekRetribusi::where('isDeleted', false)
            ->with(['jenisObjekRetribusi:idJenisObjekRetribusi,jenisObjekRetribusi', 'lokasiObjekRetribusi:idLokasiObjekRetribusi,lokasiObjekRetribusi'])
            ->get();

        Log::info('Data Objek Retribusi dari Database:', $objekRetribusis->toArray());
        return response()->json(['data' => $objekRetribusis]);
    }
    public function store(Request $request)
{
    $validator = Validator::make($request->all(), [
        'idJenisLokasiObjekRetribusi' => 'required|exists:lokasi_objek_retribusi,idLokasiObjekRetribusi',
        'idJenisObjekRetribusi' => 'required|exists:jenis_objek_retribusi,idJenisObjekRetribusi',
        'kodeObjekRetribusi' => 'required|string|max:255|unique:objek_retribusi,kodeObjekRetribusi',
        'noBangunan' => 'nullable|string|max:255',
        'jumlahLantai' => 'nullable|integer|min:0',
        'objekRetribusi' => 'required|string|max:255',
        'panjangTanah' => 'nullable|numeric|min:0',
        'lebarTanah' => 'nullable|numeric|min:0',
        'luasTanah' => 'nullable|numeric|min:0',
        'panjangBangunan' => 'nullable|numeric|min:0',
        'lebarBangunan' => 'nullable|numeric|min:0',
        'luasBangunan' => 'nullable|numeric|min:0',
        'alamat' => 'required|string',
        'latitute' => 'required|numeric',
        'longitudee' => 'required|numeric',
        'keterangan' => 'nullable|string',
        'gambarDenahTanah' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Validasi untuk file gambar
        'isDeleted' => 'nullable|boolean',
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }

    $data = $request->all();

    if ($request->hasFile('gambarDenahTanah')) {
        $gambar = $request->file('gambarDenahTanah');
        $namaGambar = time() . '_' . $gambar->getClientOriginalName();
        $pathGambar = $gambar->storeAs('public/denah', $namaGambar); // Simpan di storage/app/public/denah
        $data['gambarDenahTanah'] = 'storage/denah/' . $namaGambar; // Simpan path relatif ke public
    }

    $objekRetribusi = ObjekRetribusi::create($data);
    return response()->json(['message' => 'Objek retribusi berhasil ditambahkan', 'data' => $objekRetribusi], 201);
}

    public function show(ObjekRetribusi $objekRetribusi)
    {
        if ($objekRetribusi->isDeleted) {
            return response()->json(['message' => 'Objek retribusi tidak ditemukan'], 404);
        }
        $objekRetribusi->load(['jenisObjekRetribusi:idJenisObjekRetribusi,jenisObjekRetribusi', 'lokasiObjekRetribusi:idLokasiObjekRetribusi,lokasiObjekRetribusi']);
        return response()->json(['data' => $objekRetribusi]);
    }

    public function update(Request $request, ObjekRetribusi $objekRetribusi)
{
    $validator = Validator::make($request->all(), [
        'idJenisLokasiObjekRetribusi' => 'required|exists:lokasi_objek_retribusi,idLokasiObjekRetribusi',
        'idJenisObjekRetribusi' => 'required|exists:jenis_objek_retribusi,idJenisObjekRetribusi',
        'kodeObjekRetribusi' => 'required|string|max:255|unique:objek_retribusi,kodeObjekRetribusi,' . $objekRetribusi->idObjekRetribusi . ',idObjekRetribusi',
        'noBangunan' => 'nullable|string|max:255',
        'jumlahLantai' => 'nullable|integer|min:0',
        'objekRetribusi' => 'required|string|max:255',
        'panjangTanah' => 'nullable|numeric|min:0',
        'lebarTanah' => 'nullable|numeric|min:0',
        'luasTanah' => 'nullable|numeric|min:0',
        'panjangBangunan' => 'nullable|numeric|min:0',
        'lebarBangunan' => 'nullable|numeric|min:0',
        'luasBangunan' => 'nullable|numeric|min:0',
        'alamat' => 'required|string',
        'latitute' => 'required|numeric',
        'longitudee' => 'required|numeric',
        'keterangan' => 'nullable|string',
        'gambarDenahTanah' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Validasi untuk file gambar
        'isDeleted' => 'nullable|boolean',
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }

    $data = $request->all();

    if ($request->hasFile('gambarDenahTanah')) {
        if ($objekRetribusi->gambarDenahTanah) {
            Storage::delete($objekRetribusi->gambarDenahTanah); // Perlu disesuaikan pathnya
        }

        $gambar = $request->file('gambarDenahTanah');
        $namaGambar = time() . '_' . $gambar->getClientOriginalName();
        $pathGambar = $gambar->storeAs('public/denah', $namaGambar);
        $data['gambarDenahTanah'] = 'storage/denah/' . $namaGambar;
    }

    $objekRetribusi->update($data);
    return response()->json(['message' => 'Objek retribusi berhasil diperbarui', 'data' => $objekRetribusi]);
}
    public function destroy(ObjekRetribusi $objekRetribusi)
    {
        $objekRetribusi->update(['isDeleted' => true]);
        return response()->json(['message' => 'Objek retribusi berhasil dihapus']);
    }
}