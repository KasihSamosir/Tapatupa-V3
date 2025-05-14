<?php

use App\Http\Controllers\Api\JenisPermohonanController;
use App\Http\Controllers\Api\JenisJangkaWaktuController;
use Illuminate\Support\Facades\Route;

Route::get('/jenis-permohonan', [JenisPermohonanController::class, 'index']);
Route::post('/jenis-permohonan', [JenisPermohonanController::class, 'store']);
Route::resource('jenis-jangka-waktu', JenisJangkaWaktuController::class);