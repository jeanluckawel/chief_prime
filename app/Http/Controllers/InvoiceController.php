<?php

namespace App\Http\Controllers;

//use App\Models\Invoice;
use App\Models\Customer;
use App\Models\Invoices;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $invoices = Invoices::with('customer')
            ->with('items')
            ->orderBy('created_at', 'desc')
            ->paginate(10)
        ->toArray();

        return Inertia::render('invoices/index', compact('invoices'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        $customers = Customer::all()->toArray();
        return Inertia::render('invoices/create', compact('customers'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        logger($request->all());

        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'type' => 'required|in:invoice,quotation',
            'invoice_date' => 'required|date',
            'due_date' => 'nullable|date|after_or_equal:invoice_date',
            'payment_method' => 'nullable|in:cash,bank transfer,mobile money',
            'subtotal' => 'numeric|min:0',
            'total' => 'numeric|min:0',
            'tax' => 'numeric|min:0',
            'discount' => 'nullable|numeric|min:0|max:100',
            'status' => 'nullable|in:draft,sent,paid,cancelled',
            'items' => 'required|array|min:1',
        ]);
        logger("Here's the validated data:");
        logger($validated);


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

        try {
            $result =  DB::transaction(function () use ($validated, $invoiceNumber, $tax, $discountPercent, $total) {
                $invoice = Invoices::create([
                    'user_id' => auth()->id(),
                    'customer_id' => $validated['customer_id'],
                    'type' => $validated['type'],
                    'invoice_number' => $invoiceNumber,
                    'invoice_date' => $validated['invoice_date'],
                    'due_date' => $validated['due_date'],
                    'payment_method' => $validated['payment_method'],
                    'subtotal' => $validated['subtotal'],
                    'tax' => $validated['tax'] ?? 0,
                    'discount' => $validated['discount'] ?? 0,
                    'total' => $validated['total'],
                    'status' => $validated['status'] ?? 'draft',
                ]);

                $invoice->items()->createMany($validated['items']);
                return ['invoice' => $invoice];
            });
            logger("Invoice created successfully.");

            logger("Here's the result:");
            logger($result);

            return redirect()->route('invoices.index')
                ->with('success', 'Invoice created successfully.');
        } catch (Exception $e) {
            logger($e->getMessage());
            return redirect()->back()->with('error', 'Failed to create invoice.');
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(Invoices $invoice)
    {
        $invoice->load('customer', 'items');
        return Inertia::render('invoices/show', compact('invoice'));
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
