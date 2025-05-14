<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\JenisJangkaWaktu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class JenisJangkaWaktuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $jenisJangkaWaktu = JenisJangkaWaktu::all();
        return response()->json(['data' => $jenisJangkaWaktu]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'jenisJangkaWaktu' => 'required|string|max:255|unique:jenis_jangka_waktu',
            'keterangan' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $jenisJangkaWaktu = JenisJangkaWaktu::create($request->all());
        return response()->json(['data' => $jenisJangkaWaktu, 'message' => 'Jenis jangka waktu berhasil ditambahkan'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(JenisJangkaWaktu $jenisJangkaWaktu)
    {
        return response()->json(['data' => $jenisJangkaWaktu]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, JenisJangkaWaktu $jenisJangkaWaktu)
    {
        $validator = Validator::make($request->all(), [
            'jenisJangkaWaktu' => 'required|string|max:255|unique:jenis_jangka_waktu,jenisJangkaWaktu,' . $jenisJangkaWaktu->idJenisJangkaWaktu . ',idJenisJangkaWaktu',
            'keterangan' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $jenisJangkaWaktu->update($request->all());
        return response()->json(['data' => $jenisJangkaWaktu, 'message' => 'Jenis jangka waktu berhasil diperbarui']);
    }

    /**
     * Remove the specified resource from storage (soft delete).
     */
    public function destroy(JenisJangkaWaktu $jenisJangkaWaktu)
    {
        $jenisJangkaWaktu->delete();
        return response()->json(['message' => 'Jenis jangka waktu berhasil dihapus']);
    }
}