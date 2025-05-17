<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\WajibRetribusi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class WajibRetribusiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $wajibRetribusis = WajibRetribusi::where('isDeleted', false)->get();
        return response()->json(['data' => $wajibRetribusis]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'NIK' => 'required|unique:wajib_retribusi,NIK',
            'email' => 'nullable|string|email|max:255|unique:wajib_retribusi,email',
            'nomorWhatsapp' => 'nullable|string|max:20',
            'nomorPonsel' => 'nullable|string|max:20',
            'namaWajibRetribusi' => 'required|string|max:255',
            'alamat' => 'nullable|string',
            'fileFoto' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'pekerjaan' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->all();

        if ($request->hasFile('fileFoto')) {
            $foto = $request->file('fileFoto');
            $namaFoto = time() . '_' . $foto->getClientOriginalName();
            $foto->storeAs('public/foto_wajib_retribusi', $namaFoto);
            $data['fileFoto'] = 'storage/foto_wajib_retribusi/' . $namaFoto;
        }

        $wajibRetribusi = WajibRetribusi::create($data);
        return response()->json(['message' => 'Data wajib retribusi berhasil ditambahkan', 'data' => $wajibRetribusi], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(WajibRetribusi $wajibRetribusi)
    {
        if ($wajibRetribusi->isDeleted) {
            return response()->json(['message' => 'Data wajib retribusi tidak ditemukan'], 404);
        }
        return response()->json(['data' => $wajibRetribusi]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, WajibRetribusi $wajibRetribusi)
    {
        $validator = Validator::make($request->all(), [
            'NIK' => 'nullable|string|max:255|unique:wajib_retribusi,NIK,' . $wajibRetribusi->idWajibRetribusi . ',idWajibRetribusi',
            'email' => 'nullable|string|email|max:255|unique:wajib_retribusi,email,' . $wajibRetribusi->idWajibRetribusi . ',idWajibRetribusi',
            'nomorWhatsapp' => 'nullable|string|max:20',
            'nomorPonsel' => 'nullable|string|max:20',
            'namaWajibRetribusi' => 'required|string|max:255',
            'alamat' => 'nullable|string',
            'fileFoto' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'pekerjaan' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->all();

        if ($request->hasFile('fileFoto')) {
            if ($wajibRetribusi->fileFoto) {
                Storage::delete(str_replace('storage/', 'public/', $wajibRetribusi->fileFoto));
            }
            $foto = $request->file('fileFoto');
            $namaFoto = time() . '_' . $foto->getClientOriginalName();
            $foto->storeAs('public/foto_wajib_retribusi', $namaFoto);
            $data['fileFoto'] = 'storage/foto_wajib_retribusi/' . $namaFoto;
        }

        $wajibRetribusi->update($data);
        return response()->json(['message' => 'Data wajib retribusi berhasil diperbarui', 'data' => $wajibRetribusi]);
    }

    /**
     * Remove the specified resource from storage (soft delete).
     */
    public function destroy(WajibRetribusi $wajibRetribusi)
    {
        $wajibRetribusi->update(['isDeleted' => true]);
        return response()->json(['message' => 'Data wajib retribusi berhasil dihapus']);
    }
}
