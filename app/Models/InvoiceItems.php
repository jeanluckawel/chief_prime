<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InvoiceItems extends Model
{
    //

    protected $fillable = [
        'invoice_id', 'description', 'quantity', 'unit_price', 'total_price',
        'tax_rate',
        'total',
    ];
    public function invoice()
    {
        return $this->belongsTo(Invoices::class);
    }
}
