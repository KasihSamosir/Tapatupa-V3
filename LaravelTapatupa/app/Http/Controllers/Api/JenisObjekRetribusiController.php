<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Models\JenisObjekRetribusi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class JenisObjekRetribusiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $jenisObjekRetribusis = JenisObjekRetribusi::all();
        return response()->json(['data' => $jenisObjekRetribusis]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'jenisObjekRetribusi' => 'required|string|max:255|unique:jenis_objek_retribusi,jenisObjekRetribusi,NULL,idJenisObjekRetribusi,isDeleted,0',
            'keterangan' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $jenisObjekRetribusi = JenisObjekRetribusi::create($request->all());
        return response()->json(['data' => $jenisObjekRetribusi, 'message' => 'Jenis objek retribusi berhasil ditambahkan'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(JenisObjekRetribusi $jenisObjekRetribusi)
    {
        return response()->json(['data' => $jenisObjekRetribusi]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, JenisObjekRetribusi $jenisObjekRetribusi)
    {
        $validator = Validator::make($request->all(), [
            'jenisObjekRetribusi' => 'required|string|max:255|unique:jenis_objek_retribusi,jenisObjekRetribusi,' . $jenisObjekRetribusi->idJenisObjekRetribusi . ',idJenisObjekRetribusi,isDeleted,0',
            'keterangan' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $jenisObjekRetribusi->update($request->all());
        return response()->json(['data' => $jenisObjekRetribusi, 'message' => 'Jenis objek retribusi berhasil diperbarui']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
{
    $item = JenisObjekRetribusi::findOrFail($id);
    $item->delete();

    return response()->json(['message' => 'Data berhasil dihapus']);
}

}