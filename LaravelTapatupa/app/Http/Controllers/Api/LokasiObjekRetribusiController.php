<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LokasiObjekRetribusi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log; // Tambahkan ini

class LokasiObjekRetribusiController extends Controller
{
    public function index()
    {
        $lokasi = LokasiObjekRetribusi::all();
        return response()->json(['data' => $lokasi]);
    }

    public function store(Request $request)
    {
        Log::info('Data yang diterima saat store():', $request->all()); // Pastikan ini ada untuk melihat data yang masuk

        $validator = Validator::make($request->all(), [
            'lokasiObjekRetribusi' => 'required|string|max:255',
            'keterangan' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $lokasiObjekRetribusi = LokasiObjekRetribusi::create($request->all());
        Log::info('Data yang disimpan:', $lokasiObjekRetribusi->toArray()); // Tambahkan ini untuk melihat data yang disimpan

        return response()->json(['message' => 'Lokasi objek retribusi berhasil ditambahkan', 'data' => $lokasiObjekRetribusi], 201);
    }

    public function show(LokasiObjekRetribusi $lokasiObjekRetribusi)
    {
        return response()->json(['data' => $lokasiObjekRetribusi]);
    }

    public function update(Request $request, LokasiObjekRetribusi $lokasiObjekRetribusi)
    {
        Log::info('Data yang diterima saat update():', $request->all()); // Tambahkan ini

        $validator = Validator::make($request->all(), [
            'lokasiObjekRetribusi' => 'required|string|max:255',
            'keterangan' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $lokasiObjekRetribusi->update($request->all());
        Log::info('Data setelah update:', $lokasiObjekRetribusi->toArray()); // Tambahkan ini

        return response()->json(['message' => 'Lokasi objek retribusi berhasil diperbarui', 'data' => $lokasiObjekRetribusi], 200);
    }

    public function destroy(LokasiObjekRetribusi $lokasiObjekRetribusi)
    {
        $lokasiObjekRetribusi->delete();
        return response()->json(['message' => 'Lokasi objek retribusi berhasil dihapus'], 204);
    }
}