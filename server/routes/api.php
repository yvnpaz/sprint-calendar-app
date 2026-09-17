<?php

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/events', function (Request $request) {
    $query = Event::query()->orderBy('start');

    if ($request->filled('start') && $request->filled('end')) {
        $query->whereBetween('start', [$request->query('start'), $request->query('end')]);
    }

    return $query->get();
});

Route::post('/events', function (Request $request) {
    $data = $request->validate([
        'title' => ['required', 'string'],
        'start' => ['required', 'date'],
        'end' => ['nullable', 'date'],
        'color' => ['nullable', 'string'],
    ]);

    return response()->json(Event::create($data), 201);
});
