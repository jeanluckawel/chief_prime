<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Customer extends Model
{
    //

    protected $fillable = [
        'type', 'name', 'email', 'phone', 'address', 'country', 'city', 'nif', 'rccm', 'idnat',
    ];

    public function invoices(): HasMany
    {
        return $this->hasMany(Invoices::class);
    }

}
