<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Laravel\Prompts\Output\ConsoleOutput;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        $defaultUser = User::get()->where('email', '=','test@example.com')->first();
        if(!$defaultUser){
            User::factory()->create([
                'name' => 'Test User',
                'email' => 'test@example.com',
                'password' => bcrypt(config('DEFAULT_USER_PASSWORD', 'password')),
            ]);
        }


        $this->call([
            CustomerSeeder::class,
            InvoiceSeeder::class,
        ]);
    }
}
