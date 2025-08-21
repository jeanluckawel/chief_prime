<?php

namespace App\Models;

use Database\Factories\CustomerFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Notifications\Notifiable;

class Customer extends Model
{
    /** @use HasFactory<CustomerFactory> */
    use HasFactory;

    protected $fillable = [
        'type', 'name', 'email', 'phone', 'address', 'country', 'city', 'nif', 'rccm', 'idnat',
    ];

    public function invoices(): HasMany
    {
        return $this->hasMany(Invoices::class);
    }

}
