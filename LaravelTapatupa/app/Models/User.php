<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    // Jika primary key kamu bukan 'id', tapi 'userId'
    protected $primaryKey = 'userId';

    // Jika primary key bukan auto-increment integer, atur ini
    // protected $keyType = 'int'; // defaultnya sudah int, kalau perlu

    // Jika primary key bukan auto increment
    // public $incrementing = false;

    // Kolom yang bisa diisi (mass assignable)
    protected $fillable = [
        'username',
        'email',
        'password',
        'role',
        'token',
        'keterangan',
        'isDeleted',
    ];

    // Kolom yang disembunyikan saat output JSON (contoh: password)
    protected $hidden = [
        'password',
        'remember_token',
        'token',
    ];

    // Casting tipe data
    protected $casts = [
        'isDeleted' => 'boolean',
        'email_verified_at' => 'datetime',
    ];
}
