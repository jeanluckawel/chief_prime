<?php

namespace App\Http\Controllers;

use App\Models\Invoice_Items;
use App\Models\InvoiceItems;
use Illuminate\Http\Request;

class InvoiceItemsController extends Controller
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
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validated = $request->validate([
            'invoice_id' => 'required|exists:invoices,id',
            'description' => 'required|string|max:255',
            'quantity' => 'required|numeric|min:1',
            'unit_price' => 'required|numeric|min:0',
            'total_price' => 'required|numeric|min:0',
        ]);

        foreach ($validated['quantity'] as $key => $value) {
            InvoiceItems::create([
                'invoice_id' => $validated['invoice_id'],
                'description' => $validated['description'][$key],
                'quantity' => $value,
                'unit_price' => $validated['unit_price'][$key],
                'total_price' => $validated['total_price'][$key],
            ]);
        }

        return redirect()->route('#', $validated['invoice_id'])
            ->with('success', 'Invoice items created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Invoice_Items $invoice_Items)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Invoice_Items $invoice_Items)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Invoice_Items $invoice_Items)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Invoice_Items $invoice_Items)
    {
        //
    }
}
