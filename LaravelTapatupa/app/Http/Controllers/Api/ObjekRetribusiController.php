<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ObjekRetribusi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ObjekRetribusiController extends Controller
{
    public function index()
    {
        $objekRetribusis = ObjekRetribusi::where('isDeleted', false)
            ->with(['jenisObjekRetribusi:idJenisObjekRetribusi,jenisObjekRetribusi', 'lokasiObjekRetribusi:idLokasiObjekRetribusi,lokasiObjekRetribusi'])
            ->get();
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
            'gambarDenahTanah' => 'nullable|string|max:255',
            'isDeleted' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $objekRetribusi = ObjekRetribusi::create($request->all());
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
            'gambarDenahTanah' => 'nullable|string|max:255',
            'isDeleted' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $objekRetribusi->update($request->all());
        return response()->json(['message' => 'Objek retribusi berhasil diperbarui', 'data' => $objekRetribusi]);
    }

    public function destroy(ObjekRetribusi $objekRetribusi)
    {
        $objekRetribusi->update(['isDeleted' => true]);
        return response()->json(['message' => 'Objek retribusi berhasil dihapus']);
    }
}