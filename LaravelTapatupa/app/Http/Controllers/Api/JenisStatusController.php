<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\JenisStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class JenisStatusController extends Controller
{
    public function index()
    {
        $jenisStatus = JenisStatus::whereNull('deleted_at')->get();
        return response()->json(['data' => $jenisStatus]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'jenisStatus' => 'required|string|max:255',
            'keterangan' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $jenisStatus = JenisStatus::create($request->all());
        return response()->json(['data' => $jenisStatus, 'message' => 'Jenis status berhasil ditambahkan'], 201);
    }

    public function show(JenisStatus $jenisStatus)
    {
        return response()->json(['data' => $jenisStatus]);
    }

    public function update(Request $request, JenisStatus $jenisStatus)
    {
        $validator = Validator::make($request->all(), [
            'jenisStatus' => 'required|string|max:255',
            'keterangan' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $jenisStatus->update($request->all());
        return response()->json(['data' => $jenisStatus, 'message' => 'Jenis status berhasil diperbarui']);
    }

    public function destroy(JenisStatus $jenisStatus)
    {
        $jenisStatus->delete();
        return response()->json(['message' => 'Jenis status berhasil dihapus']);
    }
}