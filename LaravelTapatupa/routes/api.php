<?php

use App\Http\Controllers\Api\JenisPermohonanController;
use App\Http\Controllers\Api\JenisJangkaWaktuController;
use App\Http\Controllers\Api\JangkaWaktuSewaController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PeruntukanSewaController;
use App\Http\Controllers\Api\JenisStatusController;
use App\Http\Controllers\Api\StatusController;
use App\Http\Controllers\Api\JenisObjekRetribusiController;
use App\Http\Controllers\Api\LokasiObjekRetribusiController;
use App\Http\Controllers\Api\ObjekRetribusiController;
use App\Http\Controllers\Api\WajibRetribusiController;
use App\Http\Controllers\Api\PermohonanSewaController;
use App\Http\Controllers\Api\TarifObjekRetribusiController;
use App\Http\Controllers\Auth\AdminLoginController;


Route::post('admin/login', [AdminLoginController::class, 'login']); // Route untuk login admin
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/admin/dashboard', function () {
        return response()->json(['message' => 'Welcome admin!']);
    });
});
Route::get('/jenis-permohonan', [JenisPermohonanController::class, 'index']);
Route::post('/jenis-permohonan', [JenisPermohonanController::class, 'store']);
Route::resource('jenis-jangka-waktu', JenisJangkaWaktuController::class);
Route::resource('jangka-waktu-sewa', JangkaWaktuSewaController::class);
Route::resource('peruntukan-sewa', PeruntukanSewaController::class);
Route::resource('jenis-status', JenisStatusController::class);
Route::resource('status-permohonan', StatusController::class);
Route::resource('jenis-objek-retribusi', JenisObjekRetribusiController::class);
Route::resource('/lokasi-objek-retribusi', LokasiObjekRetribusiController::class)->except(['create', 'edit']);
Route::resource('/objek-retribusi', ObjekRetribusiController::class)->except(['create', 'edit']);
Route::apiResource('wajib-retribusi', WajibRetribusiController::class);
Route::apiResource('permohonan-sewa', PermohonanSewaController::class);
Route::apiResource('tarif-objek-retribusi', TarifObjekRetribusiController::class);

