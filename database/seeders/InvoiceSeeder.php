<?php

namespace Database\Seeders;

use App\Models\Invoices;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class InvoiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //


        for ($i = 1; $i <= 5; $i++) {
            $type = $i % 2 === 0 ? 'quotation' : 'invoice';


            if ($type === 'invoice') {
                $prefix = 'CPE_IVC';
            } else {
                $prefix = 'CPE_QT';
            }

            $year = date('Y');
            $number = str_pad($i, 3, '0', STR_PAD_LEFT);

            $invoiceNumber = $prefix . '_' . $year . '_' . $number;


            $subtotal = 1000 * $i;
            $tax = $subtotal * 0.16;
            $discount = 10;
            $discountAmount = $subtotal * ($discount / 100);
            $total = $subtotal + $tax - $discountAmount;

            Invoices::create([
                'user_id' => 1,
                'customer_id' => 1,
                'type' => $type,
                'invoice_number' => $invoiceNumber,
                'invoice_date' => Carbon::now(),
                'due_date' => Carbon::now()->addDays(30),
                'payment_method' => 'cash',
                'subtotal' => $subtotal,
                'tax' => $tax,
                'discount' => $discount,
                'total' => $total,
                'status' => 'draft',
            ]);
        }
    }
}
