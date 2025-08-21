<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\InvoiceItems;
use App\Models\Invoices;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InvoiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        $customers = Customer::all();

        foreach (range(1, 5) as $i) {
            $invoice = Invoices::create([
                'user_id' => $users->random()->id,
                'customer_id' => $customers->random()->id,
                'invoice_number' => 'INV-'.str_pad($i, 5, '0', STR_PAD_LEFT),
                'invoice_date' => now()->subDays(rand(0, 30)),
                'due_date' => now()->addDays(rand(5, 20)),
                'payment_method' => ['cash','bank transfer','mobile money'][array_rand(['cash','bank transfer','mobile money'])],
                'subtotal' => 0,
                'tax' => 0,
                'discount' => rand(0, 50),
                'total' => 0,
                'status' => ['draft','sent','paid','cancelled'][rand(0,3)],
            ]);

            $subtotal = 0;
            $tax = 0;

            foreach (range(1, rand(2, 5)) as $j) {
                $qty = rand(1, 5);
                $unitPrice = rand(50, 500);
                $taxRate = [0,5,10,16][rand(0,3)];
                $lineTotal = $qty * $unitPrice * (1 + $taxRate / 100);

                InvoiceItems::create([
                    'invoice_id' => $invoice->id,
                    'description' => "Product $j for invoice {$invoice->invoice_number}",
                    'quantity' => $qty,
                    'unit_price' => $unitPrice,
                    'tax_rate' => $taxRate,
                    'total' => $lineTotal,
                ]);

                $subtotal += $qty * $unitPrice;
                $tax += $qty * $unitPrice * ($taxRate / 100);
            }

            $invoice->update([
                'subtotal' => $subtotal,
                'tax' => $tax,
                'total' => $subtotal + $tax - $invoice->discount,
            ]);
        }
    }
}
