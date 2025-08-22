<?php

namespace Database\Seeders;

use App\Models\Customer;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //

        Customer::create([
            'type' => 'individual',
            'name' => 'Jean Dupont',
            'email' => 'jean.dupont@example.com',
            'phone' => '+243900000001',
            'address' => '123 Avenue Lumumba',
            'country' => 'RDC',
            'city' => 'Kinshasa',
            'nif' => null,
            'rccm' => null,
            'idnat' => null,
        ]);

        Customer::create([
            'type' => 'individual',
            'name' => 'Alice Mwamba',
            'email' => 'alice.mwamba@example.com',
            'phone' => '+243900000002',
            'address' => '456 Boulevard Kasa-Vubu',
            'country' => 'RDC',
            'city' => 'Lubumbashi',
            'nif' => null,
            'rccm' => null,
            'idnat' => null,
        ]);



        Customer::create([
            'type' => 'enterprise',
            'name' => 'Tech Solutions SARL',
            'email' => 'contact@techsolutions.com',
            'phone' => '+243900000003',
            'address' => 'Zone Industrielle',
            'country' => 'RDC',
            'city' => 'Kolwezi',
            'nif' => 'NIF-12345',
            'rccm' => 'RCCM-KOL-2025',
            'idnat' => 'IDNAT-98765',
        ]);

        Customer::create([
            'type' => 'enterprise',
            'name' => 'MineCorp SA',
            'email' => 'info@minecorp.com',
            'phone' => '+243900000004',
            'address' => 'Rue de la Mine',
            'country' => 'RDC',
            'city' => 'Likasi',
            'nif' => 'NIF-54321',
            'rccm' => 'RCCM-LIK-2025',
            'idnat' => 'IDNAT-12345',
        ]);

    }
}
