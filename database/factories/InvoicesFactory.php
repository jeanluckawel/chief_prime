<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Invoices>
 */
class InvoicesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type = $this->faker->randomElement(['invoice', 'quotation']);

        $invoiceNumber = $type === 'invoice'
            ? 'INV-' . date('Y') . '-' . str_pad($this->faker->unique()->numberBetween(1, 9999), 4, '0', STR_PAD_LEFT)
            : 'QTO-' . date('Y') . '-' . str_pad($this->faker->unique()->numberBetween(1, 9999), 4, '0', STR_PAD_LEFT);

        $subtotal = 0;
        $tax = 16;
        $discount = 0;
        $total = $subtotal + $tax - $discount;



        return [
            //
            'user_id' =>  User::inRandomOrder()->first()?->id,
            'customer_id' => Customer::inRandomOrder()->first()?->id ,
            'type' => $type,
            'invoice_number' => $invoiceNumber,
            'invoice_date' => $this->faker->date(),
            'due_date' => $this->faker->date(),
            'payment_method' => $this->faker->randomElement(['cash','bank transfer','mobile money']),
            'subtotal' => $subtotal,
            'tax' => $tax,
            'discount' => $discount,
            'total' => $total,
            'status' => 'draft',
        ];
    }
}
