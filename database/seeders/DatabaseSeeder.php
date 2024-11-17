<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Andres Guerrero',
            'email' => 'andres.guerrero@staffboom.com',
            'password' => bcrypt('andresguerrero')
        ]);
        User::factory()->create([
            'name' => 'Ivan user',
            'email' => 'ivan@staffboom.com',
            'password' => bcrypt('ivanuser')
        ]);
    }
}
