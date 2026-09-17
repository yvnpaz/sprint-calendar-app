<?php

namespace Database\Seeders;

use App\Models\Event;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (Event::count() > 0) {
            $this->command->info('Seed ignoré : des événements existent déjà.');

            return;
        }

        $now = now();

        Event::insert([
            ['title' => 'Sprint kickoff', 'start' => $now, 'end' => null, 'color' => '#3880ff', 'created_at' => $now, 'updated_at' => $now],
            ['title' => 'Demo innovation', 'start' => $now->copy()->addDays(2), 'end' => null, 'color' => '#2dd36f', 'created_at' => $now, 'updated_at' => $now],
            ['title' => 'Retro', 'start' => $now->copy()->addDays(5), 'end' => $now->copy()->addDays(5)->addHours(2), 'color' => '#eb445a', 'created_at' => $now, 'updated_at' => $now],
        ]);

        $this->command->info('Seed terminé : 3 événements insérés.');
    }
}
