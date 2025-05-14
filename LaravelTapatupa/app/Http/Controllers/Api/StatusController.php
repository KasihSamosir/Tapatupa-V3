<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Status;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class StatusController extends Controller
{
    public function index()
    {
        $status = Status::with('jenisStatus')->whereNull('deleted_at')->get();
        return response()->json(['data' => $status]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'idJenisStatus' => 'required|exists:jenis_status,idJenisStatus',
            'namaStatus' => 'required|string|max:255',
            'keterangan' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $status = Status::create($request->all());
        return response()->json(['data' => $status, 'message' => 'Status permohonan berhasil ditambahkan'], 201);
    }

    public function show(Status $status)
    {
        $status->load('jenisStatus');
        return response()->json(['data' => $status]);
    }

    public function update(Request $request, Status $status)
    {
        $validator = Validator::make($request->all(), [
            'idJenisStatus' => 'required|exists:jenis_status,idJenisStatus',
            'namaStatus' => 'required|string|max:255',
            'keterangan' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $status->update($request->all());
        return response()->json(['data' => $status, 'message' => 'Status permohonan berhasil diperbarui']);
    }

    public function destroy(Status $status)
    {
        $status->delete();
        return response()->json(['message' => 'Status permohonan berhasil dihapus']);
    }
}