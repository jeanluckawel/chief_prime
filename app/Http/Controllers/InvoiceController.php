<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreInvoiceRequest;
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
        $invoices = Invoices::with('customer')
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->toArray();

        return Inertia::render('invoices/Index', compact('invoices'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //

        return Inertia::render('invoices/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreInvoiceRequest $request)
    {

        $validated = $request->validated();

        $year = now()->format('Y');
        $prefix = $validated['type'] === 'invoice' ? 'CPE_IVC' : 'CPE_QT';

        $lastInvoice = Invoices::where('type', $validated['type'])
            ->whereYear('created_at', $year)
            ->orderBy('id','desc')
            ->first();

        $lastNumber = $lastInvoice ? intval(Str::afterLast($lastInvoice->invoice_number,'-')) : 0;
        $invoiceNumber = $prefix.$year.'-'.str_pad($lastNumber+1,3,'0',STR_PAD_LEFT);

        $subtotal = 0;
        $itemsData = [];
        foreach ($validated['quantity'] as $key => $qty) {
            $lineTotal = $qty * $validated['unit_price'][$key];
            $subtotal += $lineTotal;
            $itemsData[] = [
                'description' => $validated['description'][$key],
                'quantity'    => $qty,
                'unit_price'  => $validated['unit_price'][$key],
                'tax_rate'    => $validated['tax_rate'][$key] ?? 0,
                'total'       => $lineTotal,
            ];
        }

        $tax = $subtotal * 0.16;
        $discountAmount = ($subtotal + $tax) * (($validated['discount'] ?? 0)/100);
        $total = ($subtotal + $tax) - $discountAmount;

        $invoice = Invoices::create([
            'user_id'        => auth()->id(),
            'customer_id'    => $validated['customer_id'],
            'type'           => $validated['type'],
            'invoice_number' => $invoiceNumber,
            'invoice_date'   => $validated['invoice_date'],
            'due_date'       => $validated['due_date'],
            'payment_method' => $validated['payment_method'],
            'subtotal'       => $subtotal,
            'tax'            => $tax,
            'discount'       => $validated['discount'] ?? 0,
            'total'          => $total,
            'status'         => $validated['status'] ?? 'draft',
        ]);

        $invoice->items()->createMany($itemsData);

        return redirect()->route('#',$invoice->id)
            ->with('success','Invoice created successfully with items.');
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
