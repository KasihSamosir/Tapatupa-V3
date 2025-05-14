<?php

use App\Http\Controllers\Api\JenisPermohonanController;
use App\Http\Controllers\Api\JenisJangkaWaktuController;
use App\Http\Controllers\Api\JangkaWaktuSewaController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PeruntukanSewaController;
use App\Http\Controllers\Api\JenisStatusController;
use App\Http\Controllers\Api\StatusController;
use App\Http\Controllers\Api\JenisObjekRetribusiController;

Route::get('/jenis-permohonan', [JenisPermohonanController::class, 'index']);
Route::post('/jenis-permohonan', [JenisPermohonanController::class, 'store']);
Route::resource('jenis-jangka-waktu', JenisJangkaWaktuController::class);
Route::resource('jangka-waktu-sewa', JangkaWaktuSewaController::class);
Route::resource('peruntukan-sewa', PeruntukanSewaController::class);
Route::resource('jenis-status', JenisStatusController::class);
Route::resource('status-permohonan', StatusController::class);
Route::resource('jenis-objek-retribusi', JenisObjekRetribusiController::class);