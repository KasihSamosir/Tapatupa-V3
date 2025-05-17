<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run()
    {
        User::create([
            'username' => 'admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('admin123'), // password yang di-hash
            'role' => 'admin',
            'keterangan' => 'Administrator',

             
            'username' => 'admin',
            'email' => 'admin01@gmail.com',
            'password' => Hash::make('admin'), // password yang di-hash
            'role' => 'admin',
            'keterangan' => 'Inputan Admin',
        ]);
    }
}
