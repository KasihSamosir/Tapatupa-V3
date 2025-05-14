<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PeruntukanSewa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PeruntukanSewaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $peruntukanSewa = PeruntukanSewa::whereNull('deleted_at')->get();
        return response()->json(['data' => $peruntukanSewa]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'jenisKegiatan' => 'required|string|max:255',
            'peruntukanSewa' => 'required|string|max:255',
            'keterangan' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $peruntukanSewa = PeruntukanSewa::create($request->all());
        return response()->json(['data' => $peruntukanSewa, 'message' => 'Peruntukan sewa berhasil ditambahkan'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(PeruntukanSewa $peruntukanSewa)
    {
        return response()->json(['data' => $peruntukanSewa]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PeruntukanSewa $peruntukanSewa)
    {
        $validator = Validator::make($request->all(), [
            'jenisKegiatan' => 'required|string|max:255',
            'peruntukanSewa' => 'required|string|max:255',
            'keterangan' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $peruntukanSewa->update($request->all());
        return response()->json(['data' => $peruntukanSewa, 'message' => 'Peruntukan sewa berhasil diperbarui']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PeruntukanSewa $peruntukanSewa)
    {
        $peruntukanSewa->delete();
        return response()->json(['message' => 'Peruntukan sewa berhasil dihapus']);
    }
}