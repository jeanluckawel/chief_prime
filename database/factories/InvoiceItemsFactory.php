<?php

namespace Database\Factories;

use App\Models\Invoices;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\InvoiceItems>
 */
class InvoiceItemsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $quantity = $this->faker->numberBetween(1, 10);
        $unitPrice = $this->faker->numberBetween(50, 500);
        $total = $quantity * $unitPrice ;

        return [
            //
            'invoice_id' => Invoices::inRandomOrder()->first()?->id ,
            'description' => $this->faker->randomElement([
                'Laptop Dell XPS 13',
                'Apple MacBook Pro',
                'HP Spectre x360',
                'Lenovo ThinkPad X1 Carbon',
                'Asus ROG Zephyrus G14',
                'Microsoft Surface Laptop 4',
                'Acer Swift 3',
                'Razer Blade 15',
                'Google Pixelbook Go',
                'Samsung Galaxy Book Pro',
                'Dell Inspiron 15',
                'Apple iMac 24-inch',
                'HP Envy 13',
                'Lenovo Yoga 9i',
                'Asus ZenBook 14',
            ]),
            'quantity' => $quantity,
            'unit_price' => $unitPrice,
            'total' => $total,
        ];
    }
}
