<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LokasiObjekRetribusi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LokasiObjekRetribusiController extends Controller
{
    public function index()
    {
        $lokasiObjekRetribusis = LokasiObjekRetribusi::where('isDeleted', false)->get();
        return response()->json(['data' => $lokasiObjekRetribusis]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'lokasiObjekRetribusi' => 'required|string|max:255',
            'keterangan' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $lokasiObjekRetribusi = LokasiObjekRetribusi::create($request->all());
        return response()->json(['message' => 'Lokasi objek retribusi berhasil ditambahkan', 'data' => $lokasiObjekRetribusi], 201);
    }

    public function show(LokasiObjekRetribusi $lokasiObjekRetribusi)
    {
        if ($lokasiObjekRetribusi->isDeleted) {
            return response()->json(['message' => 'Lokasi objek retribusi tidak ditemukan'], 404);
        }
        return response()->json(['data' => $lokasiObjekRetribusi]);
    }

    public function update(Request $request, LokasiObjekRetribusi $lokasiObjekRetribusi)
    {
        $validator = Validator::make($request->all(), [
            'lokasiObjekRetribusi' => 'required|string|max:255',
            'keterangan' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $lokasiObjekRetribusi->update($request->all());
        return response()->json(['message' => 'Lokasi objek retribusi berhasil diperbarui', 'data' => $lokasiObjekRetribusi]);
    }

    public function destroy(LokasiObjekRetribusi $lokasiObjekRetribusi)
    {
        $lokasiObjekRetribusi->delete();
        return response()->json(['message' => 'Lokasi objek retribusi berhasil dihapus']);
    }
}