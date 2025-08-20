<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InvoiceItems extends Model
{
    //

    protected $fillable = [
        'invoice_id', 'description', 'quantity', 'unit_price', 'total_price',
    ];
    public function invoice()
    {
        return $this->belongsTo(Invoices::class);
    }
}
