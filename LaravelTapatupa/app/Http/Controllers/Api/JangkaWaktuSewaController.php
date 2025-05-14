<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\JangkaWaktuSewa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class JangkaWaktuSewaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $jangkaWaktuSewa = JangkaWaktuSewa::with('jenisJangkaWaktu')->whereNull('deleted_at')->get();
        return response()->json(['data' => $jangkaWaktuSewa]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'idJenisJangkaWaktu' => 'required|exists:jenis_jangka_waktu,idJenisJangkaWaktu',
            'jangkaWaktu' => 'required|string|max:255',
            'isDefault' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $jangkaWaktuSewa = JangkaWaktuSewa::create($request->all());
        return response()->json(['data' => $jangkaWaktuSewa, 'message' => 'Jangka waktu sewa berhasil ditambahkan'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(JangkaWaktuSewa $jangkaWaktuSewa)
    {
        return response()->json(['data' => $jangkaWaktuSewa->load('jenisJangkaWaktu')]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, JangkaWaktuSewa $jangkaWaktuSewa)
    {
        $validator = Validator::make($request->all(), [
            'idJenisJangkaWaktu' => 'required|exists:jenis_jangka_waktu,idJenisJangkaWaktu',
            'jangkaWaktu' => 'required|string|max:255',
            'isDefault' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $jangkaWaktuSewa->update($request->all());
        return response()->json(['data' => $jangkaWaktuSewa->load('jenisJangkaWaktu'), 'message' => 'Jangka waktu sewa berhasil diperbarui']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(JangkaWaktuSewa $jangkaWaktuSewa)
    {
        $jangkaWaktuSewa->delete();
        return response()->json(['message' => 'Jangka waktu sewa berhasil dihapus']);
    }
}