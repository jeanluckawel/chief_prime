<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\InvoiceItems;
use App\Models\Invoices;
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
       User::factory(5)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        Customer::factory(5)->create();
        Invoices::factory(5)->create();
        InvoiceItems::factory(100)->create();


    }
}
