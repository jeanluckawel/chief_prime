<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $customers = Customer::all();
        return Inertia::render('#', compact('customers'));
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
            'type' => 'required|in:individual,enterprise',
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:customers,email',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
            'country' => 'nullable|string|max:100',
            'city' => 'nullable|string|max:100',
            'nif' => 'nullable|string|max:100',
            'rccm' => 'nullable|string|max:100',
            'idnat' => 'nullable|string|max:100',
        ]);

        Customer::create($validated);

        return redirect()->route('#')->with('success', 'Customer created successfully.');
    }
    /**
     * Display the specified resource.
     */
    public function show(Customer $customer)
    {
        return Inertia::render('#', compact('customer'));
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Customer $customer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Customer $customer)
    {
        $validated = $request->validate([
            'type' => 'sometimes|in:individual,enterprise',
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:customers,email,' . $customer->id,
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
            'country' => 'nullable|string|max:100',
            'city' => 'nullable|string|max:100',
            'nif' => 'nullable|string|max:100',
            'rccm' => 'nullable|string|max:100',
            'idnat' => 'nullable|string|max:100',
        ]);

        $customer->update($validated);

        return redirect()->route('#')->with('success', 'Customer updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customer $customer)
    {
        //
    }
}
