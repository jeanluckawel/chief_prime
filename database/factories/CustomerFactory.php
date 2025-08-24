<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\Invoices;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Foundation\Auth\User;

/**
 * @extends Factory<Customer>
 */
class CustomerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {



        return [
            'type' => $this->faker->randomElement(['individual', 'enterprise']),
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'phone' => $this->faker->phoneNumber(),
            'address' => $this->faker->address(),
            'country' => $this->faker->country(),
            'city' => $this->faker->city(),
            'nif' => strtoupper($this->faker->bothify('??######')),
            'rccm' => strtoupper($this->faker->bothify('??######')),
            'idnat' => strtoupper($this->faker->bothify('??######')),
        ];
    }
}
