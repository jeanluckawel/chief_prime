<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Invoices extends Model
{
    //

    use HasFactory;
    protected $fillable = [
        'user_id', 'customer_id', 'type', 'invoice_number', 'invoice_date', 'due_date', 'payment_method', 'subtotal', 'tax', 'discount', 'total', 'status',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(InvoiceItems::class);
    }
}
