<?php

namespace Database\Seeders;

use App\Models\InvoiceItems;
use App\Models\Invoices;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InvoiceItemsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {


        $invoices = Invoices::all();

        foreach ($invoices as $invoice) {

            $itemsCount = rand(2, 5);

            for ($i = 1; $i <= $itemsCount; $i++) {
                $quantity = rand(1, 10);
                $unitPrice = rand(50, 500);
                $taxRate = 16;
                $total = $quantity * $unitPrice * (1 + $taxRate / 100);

                InvoiceItems::create([
                    'invoice_id' => $invoice->id,
                    'description' => "Item $i for invoice {$invoice->invoice_number}",
                    'quantity' => $quantity,
                    'unit_price' => $unitPrice,
                    'tax_rate' => $taxRate,
                    'total' => $total,
                ]);
            }
        }

    }

}
