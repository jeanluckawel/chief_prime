<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\Invoices;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //

        return Inertia::render('#');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'type' => 'required|in:invoice,quotation',
            'invoice_date' => 'required|date',
            'due_date' => 'nullable|date|after_or_equal:invoice_date',
            'payment_method' => 'nullable|in:cash,bank transfer,mobile money',
            'subtotal' => 'required|numeric|min:0',
            'discount' => 'nullable|numeric|min:0|max:100',
            'status' => 'nullable|in:draft,sent,paid,cancelled',
        ]);


        $year = now()->format('Y');


        if ($validated['type'] === 'invoice') {
            $prefix = "CPE_IVC";
        } else {
            $prefix = "CPE_QT";
        }

        $lastInvoice = Invoices::where('type', $validated['type'])
            ->whereYear('created_at', $year)
            ->orderBy('id', 'desc')
            ->first();


        if ($lastInvoice) {
            $lastNumber = intval(Str::afterLast($lastInvoice->invoice_number, '-'));
        } else {
            $lastNumber = 0;
        }

        $newNumber = str_pad($lastNumber + 1, 3, '0', STR_PAD_LEFT);


        $invoiceNumber = $prefix . $year . '-' . $newNumber;


        $tax = $validated['subtotal'] * 0.16;

        $discountPercent = $validated['discount'] ?? 0;
        $discountAmount = ($validated['subtotal'] + $tax) * ($discountPercent / 100);

        $total = ($validated['subtotal'] + $tax) - $discountAmount;

        $invoice = Invoices::create([
            'user_id' => auth()->id(),
            'customer_id' => $validated['customer_id'],
            'type' => $validated['type'],
            'invoice_number' => $invoiceNumber,
            'invoice_date' => $validated['invoice_date'],
            'due_date' => $validated['due_date'],
            'payment_method' => $validated['payment_method'],
            'subtotal' => $validated['subtotal'],
            'tax' => $tax,
            'discount' => $discountPercent,
            'total' => $total,
            'status' => $validated['status'] ?? 'draft',
        ]);

        return redirect()->route('#', $invoice->id)
            ->with('success', 'Invoice created successfully.');
    }


    /**
     * Display the specified resource.
     */
    public function show(Invoices $invoice)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Invoices $invoice)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Invoices $invoice)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Invoices $invoice)
    {
        //
    }
}
