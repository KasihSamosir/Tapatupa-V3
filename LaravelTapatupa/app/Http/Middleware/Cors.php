<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Cors
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        $response->headers->set('Access-Control-Allow-Origin', '*'); // Atau domain spesifik seperti http://localhost:3000
        $response->headers->set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
        $response->headers->set('Access-Control-Allow-Credentials', 'true'); // Jika Anda menggunakan cookie untuk otentikasi
        $response->headers->set('Access-Control-Max-Age', '3600'); // Optional: Berapa lama (dalam detik) hasil preflight request dapat di-cache

        return $response;
    }

    protected $middleware = [
    // ...
    \App\Http\Middleware\Cors::class, // Tambahkan baris ini
];
}